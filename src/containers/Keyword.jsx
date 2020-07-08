import React, {useEffect, useRef, useState} from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './keyword.css'

const Keyword = () => {
    const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3', 'Tag 2', 'Tag 3']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState("");
    const [input, setInput] = useState('')
    const [editInput, setEditInput] = useState('')


    const handleClose = (removedTag) => {
        // const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        // this.setState({ tags });
        setTags(tags.filter(tag => tag !== removedTag))
    };

    const showInput = () => {
        // this.setState({ inputVisible: true }, () => this.input.focus());
        setInputVisible(true)
    };

    const handleInputChange = e => {
        // this.setState({ inputValue: e.target.value });
        setInputValue(e.target.value)
    };

    const handleInputConfirm = () => {
        // const { inputValue } = this.state;
        let { tag } = tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tag = [...tags, inputValue];
        }
        console.log(tag);
        // this.setState({
        //     tags,
        //     inputVisible: false,
        //     inputValue: '',
        // });
        setTags(tag)
        setInputVisible(false)
        setInputValue('')
    };

    const handleEditInputChange = e => {
        // this.setState({ editInputValue: e.target.value });
        setEditInputValue(e.target.value)
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags)
        setEditInputIndex(-1)
        setEditInputValue('')
        // this.setState(({ tags, editInputIndex, editInputValue }) => {
        //     const newTags = [...tags];
        //     newTags[editInputIndex] = editInputValue;
        //
        //     return {
        //         tags: newTags,
        //         editInputIndex: -1,
        //         editInputValue: '',
        //     };
        // });
    };

    const saveInputRef = input => {
        setInput(input)
        // this.input = input;
    };

    const saveEditInputRef = input => {
        setEditInput(input)
        // this.editInput = input;
    };

    return (
        <>
            {tags.map((tag, index) => {
                if (editInputIndex === index) {
                    return (
                        <Input
                            ref={saveEditInputRef}
                            key={tag}
                            size="small"
                            className="tag-input"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }

                const isLongTag = tag.length > 20;

                const tagElem = (
                    <Tag
                        className="edit-tag"
                        key={tag}
                        closable={index !== 0}
                        onClose={() => handleClose(tag)}
                    >
              <span
                  onDoubleClick={e => {
                      if (index !== 0) {
                          // this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                          //     this.editInput.focus();
                          // });
                          setEditInputIndex(index)
                          setEditInputValue(tag)
                          //todo focus
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible && (
                <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </>
    )
}

export default Keyword