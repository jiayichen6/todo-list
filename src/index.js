const updateList = () => {
  return {
    list: [
      { id: 0, text: "Breakfast", completed: false },
      { id: 1, text: "Lunch", completed: false },
      { id: 2, text: "Dinner", completed: false },
      { id: 3, text: "Dessert", completed: false },
    ],
    id: 4,
    newText: "",
    editingItem: null,

    addItem() {
      if (this.newText.trim() != "") {
        const newItem = {
          id: this.id,
          text: this.newText.trim(),
          completed: false,
        };
        this.list.unshift(newItem);
        this.id++;
      }
      this.newText = "";
    },

    deleteItem(id) {
      const deleteIndex = this.list.findIndex((i) => i.id === id);
      this.list.splice(deleteIndex, 1);
    },

    completedItem(item) {
      item.completed = !item.completed;
      this.list = this.list.slice().sort((a, b) => a.completed - b.completed);
    },
  };
};

export default updateList;
