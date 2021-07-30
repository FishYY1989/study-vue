<template>
  <div class="admin">
    <message ref="msgSuccess" class="success">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title="slotProps">
        <strong>{{ slotProps.title }}</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default> 新增课程成功！ </template>
    </message>

    <message ref="msgWarning" class="warning">
      <!-- 命名为title插槽内容 -->
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <!-- 默认插槽内容 -->
      <template v-slot:default> 请输入课程名称！ </template>
    </message>
    <h2 :title="title">
      <svg class="icon">
        <use xlink:href="#icon-gouwuche"></use>
      </svg>
      <!--插值文本-->
      {{ title }}
    </h2>
    <!-- 批量更新价格 -->
    <p>
      <input type="text" v-model.number="price" />
      <button @click="batchUpdate">批量更新价格</button>
    </p>

    <CourseAdd v-model="course" @add-course="addCourse"></CourseAdd>

    <CourseList :courses="courses"></CourseList>

    <!-- 商品总数 -->
    <p>
      <!-- 表达式 -->
      <!-- 课程总数： {{courses.length + '门'}} -->
      <!-- 计算属性 -->
      <!-- 课程总数： {{total}} -->
      <!-- 监听器 -->
      课程总数： {{ totalCount }}
    </p>

    <!-- 嵌套内容出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import CourseList from "@/components/CourseList.vue";
import message from "@/components/Message.vue";
import CourseAdd from "@/components/CourseAdd.vue";
import { getCourses } from "@/api/course";
// import focus from "@/directives/focus";
import Vue from "vue";

//总线
Vue.prototype.$bus = new Vue();

// 全局引入自定义指令
// Vue.directive("focus", focus);
export default {
  components: {
    CourseList,
    message,
    CourseAdd,
  },
  data() {
    return {
      title: "我的购物车",
      course: "",
      courses: [],
      totalCount: 0,
      price: 0,
    };
  },
  async created() {
    //组件实例已创建，由于未挂载，dom不存在
    const courses = await getCourses();
    this.courses = courses;
  },
  methods: {
    addCourse() {
      if (this.course) {
        //添加course到数组
        this.courses.push({ name: this.course, price: 0 });
        this.course = "";

        //显示提示信息
        this.$refs.msgSuccess.toggle();
      } else {
        //显示错误信息
        this.$refs.msgWarning.toggle();
      }
    },
    batchUpdate() {
      this.courses.forEach((c) => {
        // c.price = this.price   no ok
        // this.$set(c, 'price', this.price)  ok
        this.$set(c, "price", this.price);
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (window.isLogin) {
      next();
    } else {
      next("/login?redirect=" + to.fullPath);
    }
  },
  computed: {
    total() {
      //计算属性有缓存性：如果值没有发生变化，则页面不会重新渲染
      return this.courses.length + "门";
    },
  },
  watch: {
    courses: {
      immediate: true, //立即执行一次
      // deep: true,
      handler(newValue) {
        this.totalCount = newValue.length + "门";
      },
    },
  },
};
</script>
