<template>
    <div class="home container">
        <div class="search-form columns is-centered">
            <div class="search-form column is-8">
                <div class="field has-addons has-addons-centered">
                    <p class="control">
                        <span class="select is-info is-rounded">
                            <select v-model="searchBy" @change="books = []">
                                <option value="title">Titolo</option>
                                <option value="author">Autore</option>
                            </select>
                        </span>
                    </p>
                    <p ref="searchInput_control" class="control">
                        <input
                            ref="searchInput"
                            class="input is-info"
                            type="text"
                            placeholder="Cerca libri..."
                            v-model="searchTerm"
                            @keypress.enter="getBooks"
                        />
                    </p>
                    <p class="control">
                        <a class="button is-info is-rounded" @click="getBooks">
                            Cerca
                        </a>
                    </p>
                </div>
                <!-- check risultati in italiano/all -->
                <div class="field has-text-centered">
                    <label class="checkbox">
                        <input type="checkbox" v-model="onlyIT" />
                        Cerca libri solo in lingua italiana
                    </label>
                </div>
            </div>
        </div>

        <!-- notifica risultati della ricerca -->
        <transition v-if="books.length" name="fade" appear>
            <div v-if="books.length" class="notification is-info is-light">
                {{ books.length }} libri trovati per "{{ countTerm }}" ({{
                    searchBy
                }})
                <span v-if="onlyIT">- solo libri in italiano</span>
            </div>
        </transition>

        <!-- lista dei libri -->
        <transition v-if="books.length" name="fade" appear>
            <BooksList :books="books" />
        </transition>
    </div>
</template>

<script>
import BooksList from "../components/BooksList";
export default {
    name: "Home",
    components: { BooksList },
    data() {
        return {
            searchBy: "all",
            searchTerm: "",
            onlyIT: true,
            books: [],
            countTerm: "",
        };
    },
    methods: {
        searchURI(by) {
            if (by === "title") {
                return `http://openlibrary.org/search.json?title=${this.searchTerm}`;
            }
            if (by === "author") {
                return `http://openlibrary.org/search.json?author=${this.searchTerm}`;
            }

            return `http://openlibrary.org/search.json?q=${this.searchTerm}`;
        },
        getBooks() {
            this.books = [];
            this.$refs.searchInput_control.classList.add("is-loading");

            fetch(this.searchURI(this.searchBy))
                .then((res) => res.json())
                .then((data) => {
                    let books = [];
                    data.docs.forEach((doc) => {
                        let book = {
                            title: doc.title,
                            author: doc.author_name,
                            year: doc.first_publish_year,
                            language: doc.language,
                            cover_i: doc.cover_i,
                            subject: doc.subject,
                        };
                        books.push(book);
                    });

                    if (this.onlyIT) {
                        this.books = books.filter((book) => {
                            if (book.language) {
                                return book.language.includes("ita");
                            }
                        });
                    } else {
                        this.books = books;
                    }

                    this.$refs.searchInput_control.classList.remove(
                        "is-loading"
                    );
                    this.countTerm = this.searchTerm;
                    this.searchTerm = "";
                    this.$refs.searchInput.blur();
                })
                .catch((err) => console.log(err));
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
input[type="checkbox"]:checked {
    background-color: red;
}
</style>
