import React, { useState, ChangeEvent } from 'react';
import {
    Box,
    Input,
    Button,
    Text,
    Divider,
    Flex,
} from '@chakra-ui/react';
import { ChatMessageDto } from '../../../common/dtos';

interface ChatProps {
    messages: ChatMessageDto[];
    onSendMessage: (message: string) => void;
}

const ChatList: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <Box mx="auto" px={{ base: '6', md: '8' }}>
            <Box
                border="1px solid #ccc"
                minHeight="300px"
                padding="4"
                borderRadius="md"
                overflowY="auto"
            >
                {messages.map((msg, index) => (
                    <Box key={index}>
                        <Text fontSize="sm" color="gray.500">
                            {msg.user.name} - {msg.timestamp.toLocaleString()}
                        </Text>
                        <Text>{msg.content}</Text>
                        {msg.document && (
                            <a href={msg.document} target="_blank" rel="noopener noreferrer">
                                View Document
                            </a>
                        )}
                    </Box>
                ))}
            </Box>
            <Divider my="3" />
            <Flex>
                <Input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    mb={'10px'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage} colorScheme="green">
                    Send
                </Button>
            </Flex>
        </Box>
    );
};

export default ChatList;
