var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: 'ball.jpg'},
      {name: 'car', id: 2, path: 'car.jpg'},
      {name: 'glasses', id: 3, path: 'glasses.jpg'},
      {name: 'paintbrush', id: 4, path: 'Brush.jpg'},
      {name: 'pen', id: 5, path: 'pen.jpg'},
      {name: 'scissors', id: 6, path: 'scissors.jpg'},
      {name: 'shovel', id: 7, path: 'shovel.jpg'},
      {name: 'slinky', id: 8, path: 'slinke.jpg'},
    ],
  },
  methods: {
    async addNewItem(){
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
});
