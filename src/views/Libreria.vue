<template>
    <div class="libreria container">
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
        };
    },
    mounted() {
        fetch("http://localhost:3000/myLibrary")
            .then((res) => res.json())
            .then((data) => (this.mybooks = data))
            .catch((err) => console.log(err));
    },
};
</script>

<style lang="scss"></style>
