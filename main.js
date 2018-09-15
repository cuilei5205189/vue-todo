var app = new Vue({
    el: "#app",
    data: function() {
        return {
            input: "",
            checked: "",
            todoLists: []
        }
    },
    methods: {
        //如果用户没有添加todo,保存用户在input中输入的文字，刷新之后依然存在。
        saveInput() {
            localStorage.input = JSON.stringify(this.input)
        },
        addTodo() {
            var todo = {
                content: this.input,
                checked: false,
                createAt: new Date()
            }
            if (this.input) {
                this.todoLists.push(todo)
                localStorage.todoLists = JSON.stringify(this.todoLists)
                this.input = ""
                //添加todo之后，删除暂存在localStorage的input
                localStorage.input = ""
            }
        },
        deleteTodo(todo) {
            let index = this.todoLists.indexOf(todo)
            this.todoLists.splice(index, 1)
            localStorage.todoLists = JSON.stringify(this.todoLists)
        },
        checkedTodo(todo) {
            let index = this.todoLists.indexOf(todo)
            if (todo.checked) {
                this.todoLists[index].checked = false
            } else {
                this.todoLists[index].checked = true
            }
            localStorage.todoLists = JSON.stringify(this.todoLists)
        }
    },
    mounted() {
        //vue渲染到页面之后，开始载入资料
        if (localStorage.input) {
            this.input = JSON.parse(localStorage.input)
        }
        if (localStorage.todoLists) {
            this.todoLists = JSON.parse(localStorage.todoLists)
        } else {
            localStorage.todoLists = []
        }
    }
})
