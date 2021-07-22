
<template>
  <div>
    <!--用户输入-->
    <p>
      <input
        type="text"
        :value="value"
        @input="onInput"
        v-on:keydown.enter="addCourse"
        ref="inp"
        v-focus
        class="inp"
      />
      <button @click="addCourse">新增</button>
    </p>
  </div>
</template>

<script>
import focus from "@/directives/focus";
export default {
  props: ["value"],
  methods: {
    addCourse() {
      //派发事件通知父组件新增课程
      this.$emit("add-course");
    },
    onInput(e) {
      this.$emit("input", e.target.value);
    },
  },

  // 组件内部引入自定义指令
  directives: {
    focus: focus,
  },
  // mounted() {
  //     this.$refs.inp.focus();
  // },
};
</script>

<style lang="scss" scoped>
.inp {
  margin: 5px;
}
</style>