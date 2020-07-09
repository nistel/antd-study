import React, {useEffect, useRef, useState} from 'react';
import 'antd/dist/antd.css';
import '../components/index.css';
import {Table, Input, Space, Button, Popconfirm, Form, InputNumber} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {getAcademyPlayers} from '../store/actions/index';
import './academy.css'

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Academy = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAcademyPlayers());
    }, []);

    const playersData = useSelector(state => state.academyPlayer.academyPlayers, []) || [];

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            onFilter: (value, record) =>
                record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    // setTimeout(() => this.searchInput.select());
                }
            },
            render: text =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        }
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    function handleReset(clearFilters) {
        clearFilters();
        setSearchText('');
    }



    const [form] = Form.useForm();
    const [data, setData] = useState(playersData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            name: '',
            summonerName: '',
            age: '',
            birthday: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            console.log(index)
            if (index > -1) {
                console.log("-1이상")
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, {...item, ...row});
                setData(newData);
                setEditingKey('');
            } else {
                console.log("응 아니야")
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const columns = [
        {
            title: '이름',
            dataIndex: 'name',
            // key: 'name',
            editable: true,
            // render: text => <a>{text}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            title: '소환사명',
            dataIndex: 'summonerName',
            // key: 'summonerName',
            // render: text => text.nameKr,
        },
        {
            title: '나이',
            dataIndex: 'age',
            // key: 'age',
            editable: true,
        },
        {
            title: '생일',
            dataIndex: 'birthday',
            // key: 'birthday',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </a>
                );
            },
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {

            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={playersData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    )
}

export default Academy