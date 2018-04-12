import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * Search object
 * Current recipes object
 * Shopping list object
 * Liked recipes
 */

const state = {};

const controlSearch = async () => {
    //1.get query from view
    const query = searchView.getInput();

    if (query) {
        //2. new search object add to state
        state.search = new Search(query);

        //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        //4. search for recipes
        await state.search.getResults();

        // 5. render results on UI 
        clearLoader();
        searchView.renderResult(state.search.result);
    }

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});

const recipe = new Recipe(46956);
recipe.getRecipe();
console.info(recipe);


