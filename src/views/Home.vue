<template>
  <div>
      <b-container style="padding:10px">
         <b-row>
          <b-col md="">
            <b-form inline @submit="onSubmit">
              <b-input id="inlineFormInputName2" type="date" v-model="date" required />
              <b-form-select v-model="selected" :options="options" required/>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <highcharts :options="chartOptions" ></highcharts>
            <!-- <line-one :chart-data="datacollection"></line-one> -->
          </b-col>
        </b-row>
        <hr>
        <b-row>    
          <b-col>
            <highcharts :options="chartTwo" ></highcharts>
            <!-- <line-two :chart-data="datacollection"></line-two> -->
          </b-col>
        </b-row>
        <br>
        <div class="fixed-bottom">KEHKASHAN @ 2018</div>
      </b-container>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

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
            name: "Speed",
            color: "#65e3d9",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "Flow Rate",
            color: "#3333ff",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "Totalized Weight",
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
            name: "Speed",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "Flow Rate",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "Totalized Weight",
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
      evt.preventDefault();
      let a = this.mockData(this.date);

      this.chartOptions.title.text = a.one.title;
      this.chartOptions.series[0].data = a.one.one;
      this.chartOptions.series[1].data = a.one.two;
      this.chartOptions.series[2].data = a.one.three;
      this.chartOptions.xAxis.categories = a.one.label;
      this.chartTwo.title.text = a.two.title;
      this.chartTwo.series[0].data = a.two.one;
      this.chartTwo.series[1].data = a.two.two;
      this.chartTwo.series[2].data = a.two.three;
      this.chartTwo.xAxis.categories = a.two.label;
    }
  },
  created() {
    this.toast("Please select date and device Id", "info", "info");
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