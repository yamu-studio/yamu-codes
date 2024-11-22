<template lang="pug">
.section
  .container.is-max-tablet
    .box
      .field
        label.label お名前
          span(style="color: red") *
        .control
          input.input(type="text" placeholder="田中 太郎" v-model="formData.name")
      .field
        label.label メールアドレス
          span(style="color: red") *
        .control.has-icons-left
          input.input(type="email" placeholder="example@gmail.com" v-model="formData.mailAddress")
          span.icon.is-small.is-left
            i.fas.fa-envelope
      .field
        label.label 電話番号
        .control
          input.input(type="tel" placeholder="012-3456-7890" v-model="formData.phoneNumber")
      .field
        label.label お問い合わせ内容
          span(style="color: red") *
        .control
          .select
            select(v-model="formData.contentCD")
              option(value=0) 製品について
              option(value=1) 商品いついて
              option(value=2) なんとなく
      .field
        label.label 詳細
          span(style="color: red") *
        .control
          textarea.textarea(placeholder="お問い合わせの詳細を記入してください" v-model="formData.contentDetail")
      .field
        label.label 送信前の確認
          span(style="color: red") *
        .control
          label.checkbox 
            input(type="checkbox" v-model="formData.isConsent")
            NuxtLink プライバシーポリシー
            | に同意する
      .field
        label.label もひとつ確認
          span(style="color: red") *
        p.help ご回答までに最低でも1営業日ほどいただきますがよろしいでしょうか？
        .control
          label.radio
            input(type="radio" name="question" v-model="formData.isAllowDelay" :value="true")
            | Yes
          label.radio
            input(type="radio" name="question" v-model="formData.isAllowDelay" :value="false")
            | No

      .buttons
        button.button.is-primary(@click="sencContact") 送信する
        button.button.is-link.is-light Cancel
</template>

<script setup lang="ts">
// ＝＝＝＝＝＝＝＝＝＝＝＝ 入力されたデータの保管 ＝＝＝＝＝＝＝＝＝＝＝＝＝
const formData = ref({
  name: "",
  mailAddress: "",
  phoneNumber: "",
  contentCD: 0,
  contentDetail: "",
  isConsent: false,
  isAllowDelay: false,
});

function sencContact() {
  alert("送信しました！");
}
</script>
