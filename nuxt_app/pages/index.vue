<template lang="pug">
.section
  .container.is-max-tablet
    .box
      .block.notification.is-danger.scrollView(v-if="onErrorMessage && v$.$invalid")
        button.delete(@click="closeErrorMessage")
        p.help(v-for="error in v$.$silentErrors" :key="error.key") {{ error.$message }}
  
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
        button.button.is-primary(@click="checkForm") 送信する
        button.button.is-link.is-light Cancel
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";

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

// ＝＝＝＝＝＝＝＝＝＝＝＝ バリデーション系 ＝＝＝＝＝＝＝＝＝＝＝＝＝
const requireText = "必須項目です。";
const formRule = {
  name: {
    required: helpers.withMessage("お名前：" + requireText, required),
    maxLength: helpers.withMessage(
      "お名前：1~10文字でお願いします。",
      maxLength(10)
    ),
  },
  mailAddress: {
    required: helpers.withMessage("メールアドレス：" + requireText, required),
  },
  contentDetail: {
    required: helpers.withMessage("お問い合わせ詳細：" + requireText, required),
  },
};
const v$ = useVuelidate(formRule, formData);

const onErrorMessage = ref(false);
function closeErrorMessage() {
  onErrorMessage.value = false;
}

function checkForm() {
  if (v$.value.$invalid) {
    onErrorMessage.value = true;
    return;
  }

  if (!formData.value.isConsent) {
    alert("プライバシーポリシーに同意しない場合は送信できません。");
    return;
  }
  if (!formData.value.isAllowDelay) {
    alert("もひとつ確認に同意しない場合は送信できません。");
    return;
  }

  // OKなら送信
  sencContact();
}

function sencContact() {
  alert("送信しました！");
}
</script>
