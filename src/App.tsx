import './App.css'
import {Button, Checkbox, Flex, Form, Input} from "antd";
import {useState} from "react";
import {ValidateStatus} from "antd/lib/form/FormItem";

export interface ITodoItem {
    id: string;
    text: string;
    completed: boolean;
}

function App() {
    const [inputState, setInputState] = useState<{
        value: string;
        validateStatus?: ValidateStatus;
        errorMsg?: string | null;
    }>({value: ''});

    const [todoList, setTodoList] = useState<ITodoItem[]>([]);

    function addTodoItem() {
        console.log("add todo item");
        todoList.push({id: Math.random().toString(), text: inputState.value, completed: false});
        setInputState('');
        setTodoList(todoList);
    }

    function onFinishFailedHandler() {
        console.log("On finish failed handler");
    }

    return (
        <>
            {/* TODO: как правильно оцентровать и макхейтить? не нравится мне этот инлайн собака*/}
            <Form style={{maxWidth: 500, margin: '0 auto'}} onFinishFailed={onFinishFailedHandler}
                  onFinish={addTodoItem}>
                <Flex gap={'small'} horizontal>
                    <Form.Item
                        label={'Enter to do'}
                        labelCol={{span: 24}}
                        labelAlign={'left'}
                        name={'input-state'}
                        rules={[{required: true, message: 'Please input your username!'}]}>
                        <Input
                            placeholder={"What needs to be done"}/>
                    </Form.Item>
                    <Button type="primary" htmlType={'button'}>Add</Button>
                </Flex>
            </Form>

            {todoList.map((item) => (
                <div key={item.id}>
                    <Checkbox/> {item.text}
                </div>
            ))}
        </>
    )
}

export default App
