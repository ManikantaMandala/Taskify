const zod = require('zod');

const todoCreationInput = zod.object({
    title: zod.string(),
    description: zod.string()
});

const todoComplete = zod.object({
    id: zod.string()
});

module.exports = {
    createTodo: todoCreationInput,
    updateTodo: todoComplete
}
