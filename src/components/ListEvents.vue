
<template>
  <v-data-table :headers="headers" :items="filtered" sort-by="" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Event List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }" v-if="isStaff">
            <v-btn color="primary" dark class="mb-2" v-on="on">New event</v-btn>
          </template>
          <v-card>
            <v-card-title>
      Event List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Event name"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.topic" label="Topic"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.time" label="time"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.duration" label="Duration"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }" v-if="isStaff">
      <v-icon small class="mr-2" @click="editItem(item._id)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:item.actions="{ item }" v-else>
      <v-rating v-model="item.rating" background-color="purple lighten-3" color="purple" small></v-rating>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>


<script>
import events from '@/db/events'
export default {
  


  data: () => ({
  search: '',
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
    events: [{
name: "Principles of Programming",
topic: "Electrical Engineering",
price: 1100,
location: "Auditorium",
time: "19/01/2019",
duration: "5 hr"
},{
name: "Software Engineering",
topic: "Computer Science",
price: 2000,
location: "Auditorium",
time: "12/12/2020",
duration: "8 hr"
},
{
name: "Artificial Intelligence",
topic: "Computer Science",
price: 900,
location: "Auditorium",
time: "25/08/2016",
duration: "3 hr"
},{
name: "Atomic, Nuclear, and Particle Physics",
topic: "Physics",
price: 500,
location: "Auditorium",
time: "12/11/2015",
duration: "2 hr"
},
{
name: "Accounting Ethics",
topic: "Business",
price: 300,
location: "Auditorium",
time: "07/07/2020",
duration: "1 hr"
},{
name: "Combinatorics",
topic: "maths",
price: 1000,
location: "Auditorium",
time: "29/12/2017",
duration: "4 hr"
},
{
name: "Dynamical systems and differential equations",
topic: "maths",
price: 1500,
location: "Auditorium",
time: "15/10/2019",
duration: "6 hr"
},{
name: "African American Entrepreneurship",
topic: "Business Management",
price: 400,
location: "Auditorium",
time: "22/12/2018",
duration: "2 hr"
},
{
name: "OEM and ODM Development",
topic: "IT Management",
price: 1200,
location: "Auditorium",
time: "18/08/2012",
duration: "4 hr"
},{
name: "Chapter 4 Cyber Security ",
topic: "IT Management",
price: 500,
location: "Auditorium",
time: "20/04/2020",
duration: "3 hr"
},
{
name: "Introduction to NoSQL Database ",
topic: "Computer Science",
price: 450,
location: "Auditorium",
time: "14/02/2020",
duration: "2 hr"
}
],
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
      return localStorage.authToken;
    },
    isStaff() {
      if (this.isLoggedIn) {
        return JSON.parse(localStorage.getItem("userDetails"))["role"] == "staff";
      }
      return false;
    },
    filtered(){
    return this.events.filter(i => i.topic.includes(this.search))
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
      //this.events = await events.getEvents()
    },

    editItem(item) {
      this.editedIndex = this.events.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
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

    async save() {
      if (this.editedIndex > -1) {
      let item = this.events[this.editedIndex]
         try{
          let edited = await events.deleteItem(item._id)
          if (edited) {
            this.events.splice(this.editedIndex, 1);
          }
        }
        catch (error) {
          this.message = error.message;
          this.alert = true
        }
        Object.assign(item, this.editedItem);
      } else {
        this.events.push(this.editedItem);
      }
      this.close();
    }
  }

};
</script>