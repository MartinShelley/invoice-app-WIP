<template>
  <div class="action-bar">
    <div class="action-bar-status">
      <span>Status</span>
      <StatusIcon :statusValue="getStatusValue" />
    </div>
    <div class="action-bar-buttons">
      <button class="button button-edit">Edit</button>
      <button class="button button-delete">Delete</button>
      <button class="button button-paid">Mark as Paid</button>
    </div>
  </div>
</template>

<script>
import StatusIcon from './UI/StatusIcon.vue';


export default {
  components: { StatusIcon },
  computed: {
    getStatusValue() {
      return this.$store.getters.getInvoiceStatus(this.$route.params.id);
    }
  }
}

</script>

<style lang="scss" scoped>
.action-bar {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  margin-top: 32px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;

  .action-bar-status {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      color: #858BB2;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: -0.25px;
    }
  }

  .action-bar-buttons {
    display: flex;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    letter-spacing: -0.25px;

    .button-edit {
      background-color: #F9FAFE;
      color: #7E88C3;
    }

    .button-delete {
      background-color: #EC5757;
      color: #fff;
    }

    .button-paid {
      background-color: #7C5DFA;
      color: #fff;
    }
  }
}
</style>