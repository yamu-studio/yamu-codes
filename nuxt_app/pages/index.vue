<template lang="pug">
.section
  .container.is-max-tablet
    .box
      .field
        label.label ToDo:
        .control
          input.input(type="text" placeholder="今日すること" v-model="todoData.todo")
      .field.is-horizontal
        .field-label
          label.label 優先度と期日:
        .field-body
          .field
            .control.is-expanded
              .select.mr-3
                select(v-model="todoData.priorityCD")
                  option(v-for="proprity in priorityList" :value="proprity.value") {{ proprity.title }}
          .field
            .control.is-expanded
              input.mx-3(type="datetime-local" v-model="todoData.deadline")
      button.button.is-primary(@click="addTodo") 登録！
    
    .box
      table.table.is-striped.is-hoverable.is-fullwidth
        thead
          tr 
            th ToDo
            th 優先度
            th 期日
            th 完了
        tbody
          tr(v-for="todo in todoList" :class="{'text-delete-black':todo.isClear}")
            th {{ todo.todo }}
            td {{ getPriorityTitle(todo.priorityCD) }}
            td {{ datetimeFormat(todo.deadline) }}
            td 
              input(type="checkbox" v-model="todo.isClear")
</template>

<script setup lang="ts">
// ＝＝＝＝＝＝＝＝＝＝＝＝ 表示に関するもの ＝＝＝＝＝＝＝＝＝＝＝＝＝
const priorityList = [
  { title: "最優先！", value: 0 },
  { title: "ふつう", value: 1 },
  { title: "低", value: 2 },
];

function getPriorityTitle(cd: number) {
  let returnValue = "不明";

  let preList = priorityList.filter(function (vl) {
    return vl.value == cd;
  });

  if (0 < preList.length) {
    returnValue = preList[0].title;
  }

  return returnValue;
}
function datetimeFormat(datetimeLocal: string) {
  const date = new Date(datetimeLocal);
  const yyyy = `${date.getFullYear()}`;
  // .slice(-2)で文字列中の末尾の2文字を取得する
  // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
  const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点
  const dd = `0${date.getDate()}`.slice(-2);
  const HH = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  // const ss = `0${date.getSeconds()}`.slice(-2);

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}`;
}

// ＝＝＝＝＝＝＝＝＝＝＝＝ 入力されたデータの保管 ＝＝＝＝＝＝＝＝＝＝＝＝＝
const todoData = ref({
  todo: "",
  priorityCD: 0,
  deadline: "2024-01-01T00:00",
  isClear: false,
});

const todoList = ref([
  {
    todo: "にんじん買う",
    priorityCD: 1,
    deadline: "2024-11-01T18:00",
    isClear: false,
  },
  {
    todo: "本屋さんでプログラミング書買う",
    priorityCD: 0,
    deadline: "2024-11-03T09:00",
    isClear: true,
  },
  {
    todo: "秋刀魚買う",
    priorityCD: 1,
    deadline: "2024-11-01T18:00",
    isClear: false,
  },
  {
    todo: "ランニングする",
    priorityCD: 2,
    deadline: "2024-11-11T10:00",
    isClear: false,
  },
  {
    todo: "玉ねぎ買う",
    priorityCD: 1,
    deadline: "2024-11-01T18:00",
    isClear: false,
  },
]);

function clearTodo() {
  todoData.value = {
    todo: "",
    priorityCD: 0,
    deadline: "2020-01-01",
    isClear: false,
  };
}
function addTodo() {
  todoList.value.push(todoData.value);
  clearTodo();
}
</script>
<style scoped lang="scss">
.content-row-space-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.text-delete-black {
  text-decoration: line-through;
}
</style>
