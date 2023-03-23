<template>
  <div class="container">
    <div class="left">
      <h3>{{ data.city }}</h3>
      <button @click="showChange">切换</button>
      <h1>{{ data.tem }} 度</h1>
    </div>
    <div class="right">
      <p>{{ data.update_time }}更新</p>
      <p>{{ data.wea }}</p>

      <div class="air">空气质量 {{ data.air }}</div>
      <p>{{ data.win }} {{ data.win_speed }}</p>
      <p>相对湿度: {{ data.humidity }}</p>
      <p>日期：{{ data.date }}</p>
      <p>今日：{{ data.week }}</p>
    </div>
    <div class="show" v-show="isShow">
      <h4>切换城市</h4>
      <input
        type="text"
        placeholder="请输入城市名称"
        @input="changeCity"
        ref="input"
        @keydown="enter"
      />
      <div class="btn">
        <button @click="updateWheather">确认</button>
        <button @click="closeChange">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import city from "../weather/city.json";

export default {
  name: "weaTher",
  data() {
    return {
      user: {
        appid: "27387912",
        appsecret: "dG3wqwZM",
        unescape: 1,
      },

      data: {},

      isShow: false,

      cityName: "",
      cityid: "",
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    // 获取天气数据
    getData() {
      let url = `https://v0.yiketianqi.com/free/day?appid=${this.user.appid}&appsecret=${this.user.appsecret}&unescape=1&cityid=${this.cityid}`;
      axios.get(url).then((response) => {
        console.log(response);
        this.data = response.data;
      });
    },

    // 显示面板
    showChange() {
      this.isShow = true;
    },

    // 隐藏面板
    closeChange() {
      this.isShow = false;
    },

    // input 输入
    changeCity(e) {
      this.cityName = e.target.value;
    },

    // 过滤城市
    filterCity() {
      try {
        let result = city.filter((obj) => {
          return this.cityName == obj.cityZh;
        });
        if (result) {
          this.cityid = result[0].id;
        }
      } catch (error) {
        alert("城市名不正确");
      }
    },

    // 更新城市天气
    updateData() {
      this.filterCity();

      this.getData();

      // city.forEach((element) => {});

      this.isShow = false;
      this.cityName = "";
      this.$refs.input.value = "";
    },

    // 确定按钮
    updateWheather() {
      this.updateData();
    },

    enter(e) {
      if (e.keyCode === 13) {
        this.updateData();
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  height: 300px;
  display: flex;
  border: 1px solid gray;
  padding: 20px 20px;
  position: relative;
  background: rgb(178, 175, 175);
  box-shadow: 0 0 15px #000;
}
.left {
  position: relative;
  left: 0;
  margin-right: 150px;
}
.container .left button {
  width: 50px;
  height: 20px;
  background: rgb(128, 211, 241);
  outline: none;
  border: 1px solid blue;
  border-radius: 7px;
  position: absolute;
  left: 80px;
  top: 0px;
}

.left h1 {
  margin-top: 50px;
}

.right p {
  margin-bottom: 5px;
}
.right p:nth-child(1) {
  margin-bottom: 20px;
}

.right .air {
  width: 100px;
  height: 30px;
  background: orange;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 15px;
}

.show {
  height: 120px;
  width: 300px;
  position: absolute;
  background: rgba(220, 217, 217, 0.5);
  left: 50px;
  top: 100px;
  border-radius: 10px;
  text-align: center;
}

.show h4 {
  margin: 10px 0;
}

.show input {
  width: 200px;
  height: 26px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding-left: 7px;
}

.show .btn {
  display: flex;
  justify-content: center;
}

.show .btn button {
  width: 50px;
  height: 25px;
  margin: 0 20px;
  outline: none;
  background: rgb(82, 82, 158);
  border: none;
  color: #fff;
  border-radius: 5px;
}
</style>