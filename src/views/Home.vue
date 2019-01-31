<template>
  <div>
    <b-container style="padding:10px">
      <b-row>
        <b-col md>
          <b-form inline @submit="onSubmit">
            <b-input id="inlineFormInputName2" type="date" v-model="date" required/>
            <b-form-select v-model="selected" :options="options" required/>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <highcharts :options="chartOptions"></highcharts>
          <!-- <line-one :chart-data="datacollection"></line-one> -->
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <highcharts :options="chartTwo"></highcharts>
          <!-- <line-two :chart-data="datacollection"></line-two> -->
        </b-col>
      </b-row>
      <br>
      <div class="fixed-bottom">KEHKASHAN @ 2019</div>
    </b-container>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import api from "../api.js";
import { map } from "lodash";
import momnt from "moment";

export default {
  name: "home",
  data() {
    return {
      chartOptions: {
        chart: {
          zoomType: "x"
        },
        title: {
          text: "IOT Readings"
        },
        subTitle: {
          text: ""
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          title: {
            text: "Scale"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            }
          }
        },

        series: [
          {
            name: "Speed (m/sec)",
            color: "#65e3d9",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "Flow Rate (T/Hr)",
            color: "#3333ff",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "Totalized Weight (Tones)",
            color: "#ff9933",
            data: [4394, 5250, 5177, 69658, 9731, 11991, 13733, 15415]
          }
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      },
      chartTwo: {
        chart: {
          zoomType: "x"
        },
        title: {
          text: "IOT Readings"
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          title: {
            text: "Scale"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            }
          }
        },

        series: [
          {
            name: "Speed (m/sec)",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "Flow Rate (T/Hr)",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "Totalized Weight (Tones)",
            data: [4394, 5250, 5177, 69658, 9731, 11991, 13733, 15415]
          }
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      },
      selected: null,
      input: "",
      date: "",
      options: [
        { value: null, text: "Please select an option" },
        { value: "ABCD", text: "ABCD" },
        { value: "XYZA", text: "XYZA" }
      ]
    };
  },
  mounted() {},
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    onSubmit(evt) {
      console.log(this.selected, this.date);
      if (this.selected && this.date) {
        api()
          .post("http://localhost:3000/data-date", {
            id: this.selected,
            date: this.date,
            datePast: momnt(this.date).subtract(1, "M")
          })
          .then(({ data }) => {
            console.log(data);
            NProgress.start();
            this.chartOptions.title.text = this.date;
            this.chartOptions.series[0].data = map(data.data, "speed");
            this.chartOptions.series[1].data = map(data.data, "flowRate");
            this.chartOptions.series[2].data = map(
              data.data,
              "totalizedWeight"
            );
            this.chartOptions.xAxis.categories = map(data.data, "timestamp");

            this.chartTwo.title.text = momnt(this.date)
              .subtract(1, "M")
              .format("YYYY-MM-DD");
            this.chartTwo.series[0].data = map(data.dataPast, "speed");
            this.chartTwo.series[1].data = map(data.dataPast, "flowRate");
            this.chartTwo.series[2].data = map(
              data.dataPast,
              "totalizedWeight"
            );
            this.chartTwo.xAxis.categories = map(data.dataPast, "timestamp");
            if (!data.length > 0) {
              this.toast(
                `Their is no data of device ${this.selected} on ${this.date}`,
                "warning",
                "danger"
              );
            }
            if (!data.datePastLength) {
              this.toast(
                `Their is no data of device ${this.selected} on ${momnt(
                  this.date
                )
                  .subtract(1, "M")
                  .format("YYYY-MM-DD")}`,
                "warning",
                "danger"
              );
            }
            NProgress.done();
          });
      } else {
        this.toast("Please select date and device Id", "error", "error");
      }

      evt.preventDefault();
    }
  },
  created() {
    this.toast("Please select date and device Id", "info", "info");
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
  },
  computed: {},
  components: {
    highcharts: Chart
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