<template>
    <div>
        <canvas ref="canvas" style="padding:20px" width="400" height="80"></canvas>
    </div>
</template>

<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    data: {
      type: Array
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#D5EED3",
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false, zoom: { enable: true } }
    );
  }
};
</script>