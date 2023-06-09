<template>
  <div class="invoice-header">
    <router-link class="go-back" to="/">
      <img src="@/assets/icon-arrow-left.svg" />
      <span>Go back</span>
    </router-link>
    <InvoiceActionBar :is-mobile="isMobile" @delete-dialog="showDeleteDialog" @edit-invoice="showForm"
      @mark-paid="markInvoiceAsPaid" />
  </div>
  <div class="invoice-main">
    <div class="invoice-heading">
      <div class="invoice-id">
        <h3><span>#</span>{{ invoiceDetails.id }}</h3>
        <p>{{ invoiceDetails.description }}</p>
      </div>
      <div class="sender-address-info">
        <p>{{ invoiceDetails.senderAddress.street }}</p>
        <p>{{ invoiceDetails.senderAddress.city }}</p>
        <p>{{ invoiceDetails.senderAddress.postCode }}</p>
        <p>{{ invoiceDetails.senderAddress.country }}</p>
      </div>
    </div>
    <div class="invoice-info">
      <div class="invoice-dates">
        <div>
          <p class="title">Invoice Date</p>
          <h4>{{ formatInvoiceDate }}</h4>
        </div>
        <div>
          <p class="title">Payment Due</p>
          <h4>{{ formatPaymentDue }}</h4>
        </div>
      </div>
      <div class="invoice-bill-to">
        <p class="title">Bill To</p>
        <h4>{{ invoiceDetails.clientName }}</h4>
        <p>{{ invoiceDetails.clientAddress.street }}</p>
        <p>{{ invoiceDetails.clientAddress.city }}</p>
        <p>{{ invoiceDetails.clientAddress.postCode }}</p>
        <p>{{ invoiceDetails.clientAddress.country }}</p>
      </div>
      <div class="invoice-client-email">
        <p class="title">Sent to</p>
        <h4>{{ invoiceDetails.clientEmail }}</h4>
      </div>
    </div>
    <div class="invoice-items">
      <table v-if="!isMobile">
        <tr>
          <th>Item Name</th>
          <th>QTY.</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        <tr v-for="(item, index) in invoiceDetails.items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>£{{ item.price.toFixed(2) }}</td>
          <td>£{{ item.total.toFixed(2) }}</td>
        </tr>
      </table>
      <div v-else>
        <div class="invoice-item" v-for="(item, index) in invoiceDetails.items" :key="index">
          <div>
            <p class="invoice-item-name">{{ item.name }}</p>
            <p>{{ item.quantity }} x £{{ item.price.toFixed(2) }}</p>
          </div>
          <p class="invoice-item-total">£{{ item.total.toFixed(2) }}</p>
        </div>
      </div>
    </div>
    <div class="invoice-total">
      <p>Amount Due</p>
      <h3>£{{ invoiceDetails.total.toFixed(2) }}</h3>
    </div>
  </div>
  <div id="delete-confirmation" v-show="deletePrompt">
    <div class="background"></div>
    <dialog>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete invoice #{{ invoiceDetails.id }}? This action cannot be undone.</p>
      <div class="buttons">
        <button class="cancel" @click="hideDeleteDialog">Cancel</button>
        <button class="delete" @click="deleteInvoice()">Delete</button>
      </div>
    </dialog>
  </div>
  <div id="invoice-form-background" v-show="showFormToggle" @click="hideForm"></div>
  <Transition name="slide">
    <InvoiceForm v-if="showFormToggle" @hide-form="hideForm" :editing-form="true" />
  </Transition>
</template>

<script>
import InvoiceActionBar from '@/components/InvoiceActionBar.vue';
import InvoiceForm from '@/components/InvoiceForm.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      deletePrompt: false,
    }
  },
  components: {
    InvoiceActionBar,
    InvoiceForm
  },
  computed: {
    invoiceDetails() {
      return this.$store.getters.getInvoice(this.$route.params.id);
    },
    formatInvoiceDate() {
      if (this.invoiceDetails.createdAt) {
        const date = this.invoiceDetails.createdAt.split("-");
        return `${date[2]}-${date[1]}-${date[0]}`;
      }
      else {
        return "";
      }
    },
    formatPaymentDue() {
      if (this.invoiceDetails.paymentDue) {
        const value = this.invoiceDetails.paymentDue.split('-');
        return `${value[2]}-${value[1]}-${value[0]}`;
      }
      else {
        return "";
      }
    },
    showFormToggle() {
      return this.$store.getters.getShowFormToggle;
    },
    ...mapGetters({
      isMobile: 'getIsMobile'
    })
  },
  methods: {
    deleteInvoice() {
      this.$store.dispatch('deleteInvoice', this.invoiceDetails);
      this.$router.push('/');
      this.hideDeleteDialog();
    },
    hideDeleteDialog() {
      this.deletePrompt = false;
      document.body.style.overflow = "";
    },
    showDeleteDialog() {
      this.deletePrompt = true;
      document.body.style.overflow = "hidden";
    },
    markInvoiceAsPaid() {
      this.$store.dispatch('markAsPaid', this.invoiceDetails);
    },
    showForm() {
      this.$store.commit('toggleShowForm', true);
      document.body.style.overflow = "hidden";
    },
    hideForm() {
      this.$store.commit('toggleShowForm', false);
      document.body.style.overflow = "";
    },
  },
}

</script>

<style lang="scss" scoped>
.invoice-header {
  margin: 64px auto 0;
  max-width: 730px;

  .go-back {
    text-decoration: none;
    color: var(--main-font-color);
    font-size: 12px;
    line-height: 15px;
    font-weight: 700;
    letter-spacing: -0.25px;

    img {
      margin-right: 23px;
    }
  }
}

.invoice-main {
  background-color: var(--background-second-color);
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  margin-top: 24px;
  padding: 48px;

  p {
    font-size: 12px;
    color: var(--invoice-detail-font-color);
    line-height: 15px;
    letter-spacing: -0.25px;
  }

  .invoice-heading {
    display: flex;
    justify-content: space-between;
    margin-bottom: 21px;


    h3 {
      color: var(--main-font-color);
    }

    span {
      color: var(--grey-font-color);
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.8px;
    }

    .sender-address-info {
      text-align: right;

      p {
        font-size: 11px;
        letter-spacing: -0.23px;
        line-height: 18px;
      }
    }
  }

  .invoice-info {
    display: flex;
    gap: 100px;
    margin-bottom: 45px;

    .title {
      margin-bottom: 12px;
    }

    h4 {
      font-size: 15px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.31px;
      color: var(--main-font-color);
    }

    .invoice-dates {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .invoice-bill-to {
      h4 {
        margin-bottom: 8px;
      }
    }
  }

  .invoice-items {
    background-color: var(--invoice-detail-items-background);
    border-radius: 8px 8px 0px 0px;
    padding: 32px 32px 8px;

    table {
      width: 100%;

      th {
        font-size: 11px;
        line-height: 18px;
        letter-spacing: -0.23px;
        color: var(--invoice-detail-font-color);
        padding-bottom: 32px;
      }

      th:first-child {
        text-align: left;
      }

      th:nth-child(2) {
        text-align: center;
      }

      th:nth-child(3),
      th:last-child {
        text-align: right;
      }

      td {
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: -0.25px;
        padding-bottom: 32px;
      }

      tr {
        td:nth-child(2) {
          text-align: center;
        }

        td:nth-child(3),
        td:last-child {
          text-align: right;
        }

      }

      td:nth-child(1),
      td:nth-child(4) {
        color: var(--main-font-color);
      }

      td:nth-child(2),
      td:nth-child(3) {
        color: var(--invoice-detail-font-color);
      }
    }
  }

  .invoice-total {
    display: flex;
    justify-content: space-between;
    background-color: var(--invoice-detail-total-background);
    border-radius: 0px 0px 8px 8px;
    padding: 24px 32px;

    p,
    h3 {
      color: #fff;
    }

    p {
      font-size: 11px;
      letter-spacing: -0.23px;
      line-height: 18px;
    }
  }

}

#delete-confirmation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .background {
    background-color: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  dialog {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 11;
    transform: translate(-50%, -50%);
    height: 250px;
    max-width: 480px;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
    border: none;
    background-color: var(--background-second-color);

    h2 {
      font-size: 24px;
      line-break: 32px;
      letter-spacing: -0.5px;
      font-weight: 700;
      color: var(--main-font-color);
      margin-bottom: 13px;
    }

    p {
      font-size: 13px;
      color: var(--grey-font-color);
      line-height: 22px;
      letter-spacing: -0.25px;
      margin-bottom: 16px;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;

      button {
        font-size: 13px;
        line-height: 15px;
        letter-spacing: -0.25px;
        font-weight: 700;
        border-radius: 24px;
        width: 89px;
      }

      .cancel {
        background-color: #F9FAFE;
        color: #7E88C3;

        &:hover {
          background-color: #DFE3FA;
        }
      }

      .delete {
        background-color: #EC5757;
        color: #fff;

        &:hover {
          background-color: #FF9797;
        }
      }
    }
  }
}

#invoice-form-background {
  background-color: #000;
  opacity: 0.5;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
}

.dark-mode #delete-confirmation dialog .buttons .cancel {
  background-color: #252945;
  color: #DFE3FA;

  &:hover {
    background-color: #FFF;
    color: #7E88C3;
  }
}

@media screen and (max-width: 1024px) {
  .invoice-header {
    max-width: unset;
  }
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  .invoice-header {
    margin: 48px 40px 0;
  }

  .invoice-main {
    margin: 24px 40px 0;

    .invoice-info {
      gap: 110px;
    }
  }
}

@media screen and (max-width: 767px) {
  .invoice-header {
    margin: 32px 24px 0;
  }

  .invoice-main {
    margin: 16px 24px 147px;
    padding: 24px;

    .invoice-heading {
      flex-direction: column;
      gap: 30px;

      .sender-address-info {
        text-align: left;
      }
    }

    .invoice-info {
      flex-wrap: wrap;
      gap: unset;
      column-gap: 41px;
      row-gap: 36px;

      .invoice-client-email {
        width: 100%;
      }
    }


    .invoice-items {
      padding: 24px 24px 0;

      .invoice-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 24px;

        .invoice-item-name,
        .invoice-item-total {
          font-size: 12px;
          font-weight: 700;
          line-height: 15px;
          letter-spacing: -0.25px;
          text-align: left;
          color: #000;
        }

        .invoice-item-name {
          margin-bottom: 8px;
        }
      }
    }
  }

  #delete-confirmation dialog {
    padding: 32px;
    margin: 0 24px;
    top: 35%;
    left: unset;
    transform: unset;
    height: unset;
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-active,
.slide-enter-active {
  transition: transform 0.75s ease-out;
}
</style>