<template>
  <div>
    <!--条件渲染-->
    <p v-if="courses.length == 0">没有任何课程信息</p>
    <!--列表渲染-->
    <!-- <div v-for="c in courses" :key="c" :class="{active: selectedCourse === c}" @click="selectedCourse = c">
                    {{ c }}
                </div> -->

    <!--style-->
    <div :class="['course-list', $style.red]" v-else>
      <div
        v-for="c in courses"
        :key="c.name"
        :class="{[$style.active]: selectedCourse === c}"
        @click="selectedCourse = c"
      >
        {{ c.name }} - {{ c.price | currency("$") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCourse: "",
    };
  },
  props: {
    courses: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  filters: {
    currency(value, symbol = "￥") {
      return symbol + value;
    },
  },
};
</script>

<style module>
.active {
  background-color: #ddd;
}

.red {
  color: #f00;
}
</style>