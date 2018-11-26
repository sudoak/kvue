<template>
  <div>
    <b-container style="padding:10px">
      <b-row>
          <b-col md="">
            <b-form inline @submit="onSubmit">
              <b-input id="inlineFormInputName2" type="date" v-model="date" required />
              <b-form-select v-model="selected" :options="options" required/>
              <b-button type="submit" variant="primary">Submit</b-button>
              <download-excel
                v-if="calc"
                class   = "btn btn-default"
                :data   = "items"
                :fields = "json_fields"
                type    = "csv"
                name    = "kehkashan.xls">
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
        <div class="fixed-bottom">KEHKASHAN @ 2018</div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "report",
  data() {
    return {
      calc: false,
      date: "",
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
      evt.preventDefault();
      this.calc = true;
      let a = this.tableData(this.date);
      this.items = a;
    }
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