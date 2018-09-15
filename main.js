var app = new Vue({
    el: "#app",
    data: {
        input: "",
        checked: "",
        todoLists: [],
        actionType: "signUp",
        formData: {
            username: "",
            password: ""
        },
        currentUser: null
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
            localStorage.todoLists = JSON.stringify(this.todoLists)
        },
        signUp() {
            // 新建 AVUser 对象实例
            var user = new AV.User()
            // 设置用户名
            user.setUsername(this.formData.username)
            // 设置密码
            user.setPassword(this.formData.password)
            // 设置邮箱
            user.signUp().then(
                function(loggedInUser) {
                    console.log(loggedInUser)
                },
                function(error) {}
            )
        },
        signIn() {
            AV.User.logIn(this.formData.username, this.formData.password).then(
                function(loggedInUser) {
                    loggedInUser.save()
                    app.currentUser = AV.User.current()
                    localStorage.currentUser = JSON.stringify(app.currentUser)
                },
                function(error) {
                    // 异常处理
                    console.error(error)
                }
            )
        },
        getCurrentUser() {
            let {
                id,
                createdAt,
                attributes: { username }
            } = AV.User.current()
            return { id, username, createdAt }
        },
        logout() {
            AV.User.logOut()
            this.currentUser = null
            localStorage.currentUser = ""
            window.location.reload()
        }
    },
    mounted() {
        //vue渲染到页面之后，开始载入资料
        if (localStorage.input) {
            this.input = JSON.parse(localStorage.input)
        }
        if (localStorage.currentUser) {
            this.currentUser = JSON.parse(localStorage.currentUser)
        }
        if (localStorage.todoLists) {
            this.todoLists = JSON.parse(localStorage.todoLists)
        } else {
            localStorage.todoLists = []
        }
    }
})
