<template>
  <div>
    <b-container style="padding:10px">
      <b-row>
        <b-col md>
          <b-form inline @submit="onSubmit">
            <span>FROM:</span>
            <b-input id="inlineFormInputName2" type="date" v-model="from" required/>
            <span>TO:</span>
            <b-input id="inlineFormInputName2" type="date" v-model="to" required/>
            <b-form-select v-model="selected" :options="options" required/>
            <b-button type="submit" variant="primary">Submit</b-button>
            <download-excel
              v-if="calc"
              class="btn btn-default"
              :data="items"
              :fields="json_fields"
              type="csv"
              name="kehkashan.xls"
            >
              <b-button variant="info">Download</b-button>
            </download-excel>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="items" :fields="fields"></b-table>
        </b-col>
      </b-row>
      <br>
      <div class="fixed-bottom">KEHKASHAN @ 2019</div>
    </b-container>
  </div>
</template>

<script>
import api from "../api";
import moment from "moment";

export default {
  name: "report",
  data() {
    return {
      calc: false,
      date: "",
      from: "",
      to: "",
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "ABCD", text: "ABCD" },
        { value: "XYZA", text: "XYZA" }
      ],
      items: [],
      fields: ["Speed", "TotalizedWeight", "FlowRate", "Time"],
      json_fields: {
        Speed: "Speed",
        "Totalized Weight": "TotalizedWeight",
        "Flow Rate": "FlowRate",
        Time: "Time"
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  methods: {
    onSubmit(evt) {
      NProgress.start();
      evt.preventDefault();
      if (this.from && this.to && this.selected) {
        if (moment(this.from).isBefore(this.to)) {
          api()
            .post("http://localhost:3000/data-report", {
              sDate: this.from,
              eDate: this.to,
              id: this.selected
            })
            .then(({ data }) => {
              if (data.length > 0) {
                const tableData = data.data.map(item => {
                  return {
                    Time: moment(item.timestamp).format(
                      "YYYY-MM-DD hh:mm:ss A"
                    ),
                    Speed: item.speed,
                    FlowRate: item.flowRate,
                    TotalizedWeight: item.totalizedWeight
                  };
                });
                this.items = tableData;
              } else {
                this.toast(
                  `Their is no data for device ${
                    this.selected
                  } for the dates chosen`,
                  "error",
                  "error"
                );
              }
            });
        } else {
          this.toast("Please select proper FROM-TO Date", "error", "error");
        }
      } else {
        this.toast("Please select date and device Id", "error", "error");
      }
      this.calc = true;
      // let a = this.tableData(this.date);
      // this.items = a;
      NProgress.done();
    }
  },
  watch: {
    date() {
      this.calc = false;
    }
  },
  created() {
    api()
      .get("http://localhost:3000/devices")
      .then(({ data }) => {
        if (data.length > 0) {
          let op = data.data.map(item => {
            return { value: item, text: item };
          });
          op.unshift({ value: null, text: "Please select device Id" });
          this.options = op;
        }
      });
  }
};
</script>

<style scoped >
.form-inline {
  padding: 10px;
}
.form-inline > * {
  margin: 7px 5px;
}
</style>