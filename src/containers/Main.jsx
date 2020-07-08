import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import '../components/index.css';
import { Table, Tag, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getMains } from '../store/actions/index';

const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMains());
    }, []);

    const soloData = useSelector(state => state.main.soloTiers, []) || [];
    const duoData = useSelector(state => state.main.duoTiers, []) || [];

    const columns = [
        {
            title: '티어',
            dataIndex: 'champTier',
            key: 'champion.championId',
            render: text => <a>{text}</a>,
        },
        {
            title: '챔피언',
            dataIndex: 'champion',
            key: 'champion',
            render:  text => text.nameKr,
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
        <Table dataSource={soloData} columns={columns} />
    )
}

export default Main