import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketTableView from "../components/Ticket/TableView";
import Layout from "../shared/Layout";
import { api } from "@/api/api";
import useAuth from "../hooks/useAuth";
import {ConversationTypes} from "../types";
import CreateTicketModal from "../components/Messaging/CreateTicketModal";
import {showErrorToast} from "../utils/notify";

const Tickets: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [conversationList, setConversationList] = useState<ConversationTypes[]>([]);


  const toggleModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const getConversationList = async (id: number) => {
    try {
      const { status: apiStatus, data: apiData } = await api.get(api.endpoints.message.conversations + "/" + id, {});
      if (apiStatus === 200) {
        const { statusCode, data } = apiData;
        if (statusCode === 200) {
          setConversationList(data);
        } else {
          setConversationList([]);
        }
      }
    } catch (e) {
      setConversationList([]);
    }
  };

  useEffect(() => {
    void (async () => {
      await getConversationList(user.id);
    })();
  }, [user.id]);

  const startConversation = async (values: { category_id: number; message: string; }) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const params = JSON.stringify({
            chat_category_id: values.category_id,
            reference_id: "",
            conversation_status: 0,
            sender_id: user.id,
            sender_type: "radiologist",
            comments: values.message
        });
      const { status: apiStatus, data: apiData } = await api.post(
        api.endpoints.message.init,
        params,
        headers
      );
      if (apiStatus === 200) {
        const { statusCode, data } = apiData;
        if (statusCode === 200) {
          navigate("/messaging", {state: {
            conversation:data
            }})
        }
      } else {
       showErrorToast("Something went wrong,please try later");
      }
    } catch (e) {
         showErrorToast("Something went wrong,please try later");
    }
  };

  return (
    <Layout>
      <div className="h-full w-full flex flex-col bg-white-400 text-darkgray-700 p-4">
        <div className="w-full flex flex-row justify-between">
          <h2 className="font-semibold pl-8">Tickets</h2>
          <button onClick={toggleModal} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-150" type="button">
            Raise Ticket
          </button>
        </div>
        <div>
          <TicketTableView list={conversationList} />
        </div>
        {showCreateModal && <CreateTicketModal show={showCreateModal} setShow={setShowCreateModal} onSubmit={startConversation}/>}
      </div>
    </Layout>
  );
};

export default Tickets;
