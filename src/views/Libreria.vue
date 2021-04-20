<template>
    <div class="libreria container">
        <transition name="fade">
            <article v-if="newAdded" class="message is-success">
                <div class="message-body">
                    Complimenti! <strong>{{ newAdded.title }}</strong> è stato
                    aggiunto alla tua libreria.
                </div>
            </article>
        </transition>
        <transition name="fade" appear>
            <BooksList :books="mybooks" />
        </transition>
    </div>
</template>

<script>
import BooksList from "./../components/BooksList";
export default {
    components: { BooksList },
    data() {
        return {
            mybooks: [],
            newAdded: null,
        };
    },
    mounted() {
        fetch("http://localhost:3000/myLibrary")
            .then((res) => res.json())
            .then((data) => {
                if (this.$route.params.book) {
                    this.newAdded = JSON.parse(this.$route.params.book);
                }

                this.mybooks = data.sort((a, b) => b.id - a.id);
            })
            .catch((err) => console.log(err));

        setTimeout(() => {
            this.newAdded = null;
        }, 3000);
    },
};
</script>

<style lang="scss" scoped>
button.delete {
    position: absolute;
    right: 10px;
}
</style>
