document.addEventListener('DOMContentLoaded', function() {
    const addRecipeForm = document.getElementById('add-recipe-form');
    const recipesList = document.getElementById('recipes');
  
    // Function to add a new recipe
    function addRecipe(recipeName, ingredients, instructions) {
      const recipeItem = document.createElement('div');
      recipeItem.classList.add('recipe');
      recipeItem.innerHTML = `
        <h3>${recipeName}</h3>
        <p><strong>Ingredients:</strong> ${ingredients}</p>
        <p><strong>Instructions:</strong> ${instructions}</p>
        <div class="recipe-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      recipesList.appendChild(recipeItem);
    }
  
    // Function to validate the form
    function validateForm(recipeName, ingredients, instructions) {
      return recipeName.trim() !== '' && ingredients.trim() !== '' && instructions.trim() !== '';
    }
  
    // Event listener for submitting the form to add a recipe
    addRecipeForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const recipeName = document.getElementById('recipe-name').value;
      const ingredients = document.getElementById('ingredients').value;
      const instructions = document.getElementById('instructions').value;
  
      if (validateForm(recipeName, ingredients, instructions)) {
        addRecipe(recipeName, ingredients, instructions);
        addRecipeForm.reset();
      } else {
        alert('Please fill in all fields to add a recipe.');
      }
    });
  
    // Event delegation for edit and delete buttons
    recipesList.addEventListener('click', function(event) {
      const target = event.target;
  
      if (target.classList.contains('edit-btn')) {
        const recipeItem = target.closest('.recipe');
        const recipeName = recipeItem.querySelector('h3').textContent;
        const ingredients = recipeItem.querySelector('p:nth-of-type(1)').textContent.replace('Ingredients: ', '');
        const instructions = recipeItem.querySelector('p:nth-of-type(2)').textContent.replace('Instructions: ', '');
  
        // Prefill the form with existing recipe data
        document.getElementById('recipe-name').value = recipeName;
        document.getElementById('ingredients').value = ingredients;
        document.getElementById('instructions').value = instructions;
  
        // Delete the existing recipe from the list
        recipeItem.remove();
      } else if (target.classList.contains('delete-btn')) {
        target.closest('.recipe').remove();
      }
    });
  });
  