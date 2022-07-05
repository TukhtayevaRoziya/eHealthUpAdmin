import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "antd";
import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
import { Content } from "antd/lib/layout/layout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/actions/authAction";
import { getAction } from "../../redux/actions/readAction";
import { createAction } from "../../redux/actions/createAction";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { deleteAction } from "../../redux/actions/deleteAction";
import { updateAction } from "../../redux/actions/updateAction";
import { uploadImage } from "../../utility/uploadImage";
import {
  DELETE_FAQ,
  UPDATE_FAQ,
  GET_FAQ,
  CREATE_FAQ,
} from "../../redux/actions/types";

export const FAQ = () => {
  const [createVisible, setCreateVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedEditID, setselectedEditID] = useState(null);

  /* 
  answer_uz: values.answer_uz,
              answer_en: values.answer_en,
              answer_ru: values.answer_ru,
              question_uz: values.question_uz,
              question_en: values.question_en,
              question_ru: values.question_ru
  */

  const [answer_uz, setAnswer_uz] = useState("");
  const [answer_en, setAnswer_en] = useState("");
  const [answer_ru, setAnswer_ru] = useState("");
  const [question_uz, setQuestion_uz] = useState("");
  const [question_en, setQuestion_en] = useState("");
  const [question_ru, setQuestion_ru] = useState("");

  const [answer_uzInp, setAnswer_uzInp] = useState("");
  const [answer_enInp, setAnswer_enInp] = useState("");
  const [answer_ruInp, setAnswer_ruInp] = useState("");
  const [question_uzInp, setQuestion_uzInp] = useState("");
  const [question_enInp, setQuestion_enInp] = useState("");
  const [question_ruInp, setQuestion_ruInp] = useState("");
  const [attachment, setAttachment] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data } = useSelector((state) => state.faqReducer);

  // const onChange = async (e) => {
  //   setAnswer_uzInp(e.target.form[1].value);
  //   setAnswer_enInp(e.target.form[2].value);
  //   setAnswer_ruInp(e.target.form[3].value);
  //   setQuestion_uzInp(e.target.form[1].value);
  //   setQuestion_enInp(e.target.form[2].value);
  //   setQuestion_ruInp(e.target.form[3].value);
  //   setAttachment(e.target.files[0]);
  //   console.log(e.target);
  // };

  useEffect(() => {
    dispatch(getAction("question/", GET_FAQ));
  }, [dispatch]);

  const showModal = (id) => {
    setVisible(true);
    setSelectedID(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(deleteAction("question/", DELETE_FAQ, selectedID));
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      dispatch(getAction("question/", GET_FAQ));
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showEditModal = (data) => {
    setEditVisible(true);
    setselectedEditID(data);
    
    setAnswer_uz(data.answer_uz);
    setAnswer_en(data.answer_en);
    setAnswer_ru(data.answer_ru);
    setQuestion_uz(data.question_uz);
    setQuestion_en(data.question_en);
    setQuestion_ru(data.question_ru);
  };

  const editHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setEditVisible(false);
        attachment
          ? uploadImage(attachment)
              .then((res) => {
                dispatch(
                  updateAction("question/", UPDATE_FAQ, selectedEditID.id, {
                    ...values,
                    attachmentId: res.attachmentId,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
              })
          : dispatch(
              updateAction("question/", UPDATE_FAQ, selectedEditID.id, {
                ...values,
                attachmentId: selectedEditID.attachment.id,
              })
            );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandleCancel = () => {
    setEditVisible(false);
  };

  const showCreateModal = () => {
    setCreateVisible(true);
  };

  const createHandleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setCreateVisible(false);
          dispatch(
            createAction("question/", CREATE_FAQ, {
              answer_uz: values.answer_uz,
              answer_en: values.answer_en,
              answer_ru: values.answer_ru,
              question_uz: values.question_uz,
              question_en: values.question_en,
              question_ru: values.question_ru
            })
          );
          dispatch(getAction("question/", GET_FAQ));
          setAnswer_uz('')
          setAnswer_en('')
          setAnswer_ru('')
          setQuestion_uz('')
          setQuestion_en('')
          setQuestion_ru('')
        });

  };

  const createHandleCancel = () => {
    setCreateVisible(false);
  };

  const columns = [
    { title: "javob Uz", dataIndex: "answer_uz", key: "answer_uz" },
    { title: "javob Ru", dataIndex: "answer_en", key: "answer_en" },
    { title: "javob Ru", dataIndex: "answer_ru", key: "answer_ru" },
    { title: "savol Uz", dataIndex: "question_uz", key: "question_uz" },
    { title: "savol Ru", dataIndex: "question_en", key: "question_en" },
    { title: "savol Ru", dataIndex: "question_ru", key: "question_ru" },
    {
      title: (
        <>
          <Button type="primary" onClick={showCreateModal}>
            <AddBoxIcon />
          </Button>
          <Modal
            title={"Yaratish"}
            visible={createVisible}
            onOk={createHandleOk}
            onCancel={createHandleCancel}
            okText={"yaratish"}
            cancelText={"bekor qilish"}
            htmlType="submit"
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["answer_uz"],
                  value: answer_uzInp,
                },
                {
                  name: ["answer_en"],
                  value: answer_enInp,
                },
                {
                  name: ["answer_ru"],
                  value: answer_ruInp,
                },
                {
                  name: ["question_uz"],
                  value: question_uzInp,
                },
                {
                  name: ["question_en"],
                  value: question_enInp,
                },
                {
                  name: ["question_ru"],
                  value: question_ruInp,
                }
              ]}
            >
              <FieldHelpers
                label="Javob Uz"
                name="answer_uz"
                message="Iltimos Javob Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Javob en"
                name="answer_en"
                message="Iltimos Javob en qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Javob Ru"
                name="answer_ru"
                message="Iltimos Javob Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol Uz"
                name="question_uz"
                message="Iltimos savol Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol en"
                name="question_en"
                message="Iltimos savol en qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol Ru"
                name="question_ru"
                message="Iltimos savol Ru qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
      dataIndex: "",
      key: "x",
      render: (text) => (
        <>
          <Button type="danger" onClick={(e) => showModal(text.id)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={(e) => showEditModal(text)}>
            <EditOutlined />
          </Button>
          <Modal
            title={"O'chirish"}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText={"o'chirish"}
            okType={"danger"}
            cancelText={"bekor qilish"}
          >
            <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
            <p>
              Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
              tiklanmaydi
            </p>
          </Modal>
          <Modal
            title={"Tahrirlash"}
            visible={editVisible}
            onOk={editHandleOk}
            onCancel={editHandleCancel}
            okText={"tahrirlash"}
            cancelText={"bekor qilish"}
          >
            <Form
              form={form}
              layout="vertical"
              name="name"
              initialValues={{
                modifier: "public",
              }}
              fields={[
                {
                  name: ["answer_uz"],
                  value: answer_uzInp,
                },
                {
                  name: ["answer_en"],
                  value: answer_enInp,
                },
                {
                  name: ["answer_ru"],
                  value: answer_ruInp,
                },
                {
                  name: ["question_uz"],
                  value: question_uzInp,
                },
                {
                  name: ["question_en"],
                  value: question_enInp,
                },
                {
                  name: ["question_ru"],
                  value: question_ruInp,
                },
              ]}
            >

              <FieldHelpers
                label="Javob Uz"
                name="answer_uz"
                message="Iltimos Javob Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Javob en"
                name="answer_en"
                message="Iltimos Javob en qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="Javob Ru"
                name="answer_ru"
                message="Iltimos Javob Ru qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol Uz"
                name="question_uz"
                message="Iltimos savol Uz qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol en"
                name="question_en"
                message="Iltimos savol en qatorini yo'ldiring!"
              />
              <FieldHelpers
                label="savol Ru"
                name="question_ru"
                message="Iltimos savol Ru qatorini yo'ldiring!"
              />
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <BreadcrumbHelpers to={"project"} from={"home"} />

        <Table columns={columns} dataSource={data} />
      </Content>
    </>
  );
};
