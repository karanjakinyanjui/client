

  import events from '@/db/events'

  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Topic", value: "topic" },
      { text: "Price", value: "price" },
      { text: "Location", value: "location" },
      { text: "Time", value: "time" },
      { text: "Duration", value: "duration" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    events: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      topic: "",
      price: 0,
      location: "",
      time: "",
      duration: ""
    },
    defaultItem: {
      name: "",
      topic: "",
      price: 0,
      location: "",
      time: "",
      duration: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Event" : "Edit Event";
    },
    isLoggedIn() {
      return localStorage.appAuthToken;
    },
    isStaff() {
      if (this.isLoggedIn) {
        return JSON.parse(localStorage.getItem("userDetails"))["role"] == "staff";
      }
      return false;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.events = await events.getEvents()
    },

    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.events.indexOf(item);
      let sure = confirm("Are you sure you want to delete this item?")
      if (sure) {
        try{
          let deleted = await events.delete(item._id)
          if (deleted) {
            this.events.splice(index, 1);
          }
        }
        catch (error) {
          this.message = error.message;
          this.alert = true
        }
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.events[this.editedIndex], this.editedItem);
      } else {
        this.events.push(this.editedItem);
      }
      this.close();
    }
  }
