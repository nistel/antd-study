import React, {useEffect, useRef, useState} from 'react';
import 'antd/dist/antd.css';
import '../components/index.css';
import {Table, Input, Space, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import {getMains} from '../store/actions/index';

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMains());
    }, []);

    const soloData = useSelector(state => state.main.soloTiers, []) || [];
    const duoData = useSelector(state => state.main.duoTiers, []) || [];

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        ref={ searchInput }
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

    const columns = [
        {
            title: '티어',
            dataIndex: 'champTier',
            key: 'champion.championId',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('champTier'),
        },
        {
            title: '챔피언',
            dataIndex: 'champion',
            key: 'champion',
            render: text => text.nameKr,
        },
        {
            title: '라인주도권',
            dataIndex: 'lanAceRate',
            // key: 'lanAceRate',
        },
        {
            title: '밴픽률',
            dataIndex: 'banpickRate',
            // key: 'banpickRate',
        },
        {
            title: '승률',
            dataIndex: 'winRate',
            // key: 'winRate',
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

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <Table dataSource={soloData} columns={columns}/>
    )
}

export default Main