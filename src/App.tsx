import {useState, useCallback, memo, FC, useMemo} from 'react';
import {Button, Form, Input, Checkbox, FormInstance} from 'antd';

export interface ITodoItem {
    id: string;
    text: string;
    completed: boolean;
}

const TodoInput = memo(({value, onChange}) => {
    return (
        <Input
            value={value}
            onChange={onChange}
            placeholder="What needs to be done?"
        />
    );
});

function App() {
    const [todoList, setTodoList] = useState<ITodoItem[]>([]);
    const [form] = Form.useForm<{ todo: string }>();

    const addTodoItem = () => {
        const formState = form.getFieldsValue();
        console.log('formToDo', formState.todo);
        if (formState.todo.trim()) {
            const newTodo = {id: Math.random().toString(), text: formState.todo, completed: false};
            setTodoList([...todoList, newTodo]);
            form.resetFields();
        }
    };

    return (
        <div style={{maxWidth: 500, margin: '0 auto'}}>
            <MemoizedInputBlock form={form} onSubmit={addTodoItem}/>
            <MemoizedTodoItemsList todoList={todoList}/>
        </div>
    );
}


export interface IInputBlockProps {
    form: FormInstance;
    onSubmit: () => void;
}

export const InputBlock: FC<IInputBlockProps> = ({form, onSubmit}) => {
    return (
        <Form
            form={form}
            onFinish={onSubmit}
        >
            <Form.Item
                name="todo"
                rules={[{required: true, message: 'Please enter something to do!'}]}
            >
                <TodoInput/>
            </Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
        </Form>
    )
}
export const MemoizedInputBlock = memo(InputBlock);


export interface ITodoItemsListProps {
    todoList: ITodoItem[]
}

export const TodoItemsList: FC<ITodoItemsListProps> = ({todoList}) => {
    console.log("Rerender list");
    return todoList.map((item) => <MemoizedTodoItem key={item.id} todoItem={item}/>);
}

const MemoizedTodoItemsList = memo(TodoItemsList);

export interface ITodoItemProps {
    todoItem: ITodoItem
}

export const TodoItem: FC<ITodoItemProps> = ({todoItem}) => {
    console.log("rerender", todoItem.id);
    return (<div style={{marginTop: 10}}>
        <Checkbox>{todoItem.text}</Checkbox>
    </div>);
}
const MemoizedTodoItem = memo(TodoItem);
export default App;
