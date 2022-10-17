<template>
  <NavApp />
  <div class="contact container">
    <div class="box2">
      <div class="container">
        <form @click.prevent>
          <h1>Contact Form</h1>
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />
          <input type="text" placeholder="Your Name" />
          <textarea cols="30" rows="10"></textarea>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavApp from "../Header/NavApp.vue";
export default {
  name: "ContactV",
  components: { NavApp },
};
</script>

<style lang="scss" scoped>
.contact {
  .box2 {
    width: 70%;
    margin: 10px auto;
    form {
      margin: 0px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
      // border: 2px solid #d7d7d7;
      input,
      textarea,
      button {
        outline: none;
        border: 1px solid #eee;
        margin-inline: 50px;
      }
      input,
      button {
        padding: 20px;
      }
      textarea {
      }
      button {
        border-radius: 0 !important;
        background: var(--sacond-color);
      }
    }
  }
}
@media (max-width: 768px) {
  .contact {
    .box1 {
      display: none;
    }
    .box2 {
      width: 100%;
    }
  }
}
</style>
