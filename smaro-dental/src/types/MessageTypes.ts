interface ConversationTypes {
 chat_category_id: number;
 chat_conversation: string;
 comments: number;
 conversation_status: number;
 estatus: number;
 id: number;
 inserted_time: Date ;
 rating: number ;
 receiver_id: number;
 receiver_type: string;
 reference_id: number ;
 sender_id: number ;
 sender_type: string;
 updated_time: Date ;
 sender_name:string;
 agent_name: string;
 agent_id:number;
}

interface MessageTypes {
  id: number;
  chat_conversation_id: number;
  user_type: string;
  user_id: number;
  type: string;
  meta_data: any;
  message: string;
  media_type: string;
  media_url: string;
  parent_chat_id: number;
  estatus: number;
  inserted_time: Date;
}

export type {
    MessageTypes,
    ConversationTypes,
}
