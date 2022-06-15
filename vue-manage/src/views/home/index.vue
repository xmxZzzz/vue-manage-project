<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-4-11</span></p>
          <p>上次登录地点：<span>安徽</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="line"></div> -->
        <eCharts :chartData="echartData.order" style="height: 280px"></eCharts>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 260px" ref="bar"></div> -->
          <eCharts :chartData="echartData.user" style="height: 260px"></eCharts>
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 260px" ref="pie"></div> -->
          <eCharts
            :isAxisChart="false"
            :chartData="echartData.video"
            style="height: 260px"
          ></eCharts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../api/data";
import * as echarts from "echarts";
import ECharts from "../../components/ECharts.vue";
export default {
  name: "home",
  components: {
    ECharts,
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [
        // {
        //   name: "oppo",
        //   todayBuy: 500,
        //   monthBuy: 3500,
        //   totalBuy: 22000,
        // },
        // {
        //   name: "vivo",
        //   todayBuy: 300,
        //   monthBuy: 2200,
        //   totalBuy: 24000,
        // },
        // {
        //   name: "苹果",
        //   todayBuy: 800,
        //   monthBuy: 4500,
        //   totalBuy: 65000,
        // },
        // {
        //   name: "小米",
        //   todayBuy: 1200,
        //   monthBuy: 6500,
        //   totalBuy: 45000,
        // },
        // {
        //   name: "三星",
        //   todayBuy: 300,
        //   monthBuy: 2000,
        //   totalBuy: 34000,
        // },
        // {
        //   name: "魅族",
        //   todayBuy: 350,
        //   monthBuy: 3000,
        //   totalBuy: 22000,
        // },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      // echarts的汇总数据
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    //方式一：调用基本axios
    // this.$http
    //   .get("/user?ID=12345")
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //方式二：调用二次封装axios
    // getMenu().then((res) => {
    //   console.log(res);
    // });

    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        // 1、初始化折线图
        const order = data.orderData;
        const xData = order.date;
        // 获取折线图中涉及种类的name
        const oKeyArray = Object.keys(order.data[0]);
        // 用于存储每个name对应的data列表
        const series = [];
        oKeyArray.forEach((key) => {
          series.push({
            name: key,
            type: "line",
            data: order.data.map((item) => item[key]),
          });
        });
        // this.initLineChart(xData, oKeyArray, series);
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 2、初始化柱状图
        const userData = data.userData;
        // 获取柱状图中涉及种类的name
        const ukeyArray = userData.map((item) => item.date);
        // this.initBarChart(ukeyArray, userData);
        this.echartData.user.xData = ukeyArray;
        this.echartData.user.series = [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
          },
        ];

        // 3、初始化饼状图
        const videoData = data.videoData;
        // this.initPieChart(videoData);
        this.echartData.video.series = [
          {
            type: "pie",
            data: videoData,
          },
        ];
      }
      console.log(res);
    });
  },
  methods: {
    initLineChart(xData, keyArray, series) {
      // 定义折线图的Option
      const option = {
        xAxis: {
          data: xData,
        },
        yAxis: {},
        legend: {
          data: keyArray,
        },
        series,
      };
      const E = echarts.init(this.$refs.line);
      E.setOption(option);
    },
    initBarChart(keyArray, userData) {
      // 定义柱状图的Option
      const option = {
        legend: {
          textColor: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: keyArray,
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
          },
        ],
      };
      const E = echarts.init(this.$refs.bar);
      E.setOption(option);
    },
    initPieChart(videoData) {
      // 定义饼状图的Option
      const option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            type: "pie",
            data: videoData,
          },
        ],
      };
      const E = echarts.init(this.$refs.pie);
      E.setOption(option);
    },
  },
};
</script>