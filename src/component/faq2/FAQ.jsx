// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Table } from "antd";
// import { BreadcrumbHelpers, FieldHelpers } from "../../utility/Helpers";
// import { Content } from "antd/lib/layout/layout";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { useDispatch, useSelector } from "react-redux";
// // import { logout } from "../../redux/actions/authAction";
// import { getAction } from "../../redux/actions/readAction";
// import { createAction } from "../../redux/actions/createAction";
// import { DeleteOutlined } from "@ant-design/icons";
// import { EditOutlined } from "@ant-design/icons";
// import {
//   GET_FAQ,
//   CREATE_FAQ,
//   UPDATE_FAQ,
//   DELETE_FAQ
// } from "../../redux/actions/types";
// import { deleteAction } from "../../redux/actions/deleteAction";
// import { updateAction } from "../../redux/actions/updateAction";
// import { uploadImage } from "../../utility/uploadImage";

// export const FAQ = () => {
//   const [createVisible, setCreateVisible] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [editVisible, setEditVisible] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [selectedID, setSelectedID] = useState(null);
//   const [selectedEditID, setselectedEditID] = useState(null);
//   const [answer_uz, setAnswer_uz] = useState("");
//   const [answer_en, setAnswer_en] = useState("");
//   const [answer_ru, setAnswer_ru] = useState("");
//   const [description, setDescription] = useState("");
//   const [descriptionRu, setDescriptionRu] = useState("");
//   const [answerUZInp, setAnswerUZInp] = useState("");
//   const [answerEnInp, setAnswerENInp] = useState("");
//   const [answerRUInp, setAnswerRUInp] = useState("");
//   const [attachment, setAttachment] = useState(null);

//   const dispatch = useDispatch();
//   const [form] = Form.useForm();
//   const { data } = useSelector((state) => state.faqReducer);

//   const onChange = async (e) => {
//     setAnswerUZInp(e.target.form[1].value);
//     setAnswerENInp(e.target.form[2].value);
//     setAnswerRUInp(e.target.form[2].value);
//     setDescriptionInp(e.target.form[3].value);
//     setDescriptionRuInp(e.target.form[4].value);
//     setAttachment(e.target.files[0]);
//   };
//   useEffect(() => {
//     dispatch(getAction("question", GET_FAQ));
//   }, [dispatch]);

//   const showModal = (id) => {
//     setVisible(true);
//     setSelectedID(id);
//   };

//   const handleOk = () => {
//     setConfirmLoading(true);
//     dispatch(deleteAction("question", DELETE_FAQ, selectedID));
//     setTimeout(() => {
//       setVisible(false);
//       setConfirmLoading(false);
//       dispatch(getAction("question", GET_FAQ));
//     }, 1000);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const showEditModal = (data) => {
//     setEditVisible(true);
//     setselectedEditID(data);
//     setAnswer_uz(data.answer_uz);
//     setAnswer_en(data.answer_en);
//     setAnswer_ru(data.answer_ru);
//     setDescription(data.description);
//     setDescriptionRu(data.descriptionRu);
//   };

//   const editHandleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         form.resetFields();
//         setEditVisible(false);
//         attachment
//           ? uploadImage(attachment)
//               .then((res) => {
//                 dispatch(
//                   updateAction(
//                     "faq",
//                     UPDATE_FAQ,
//                     selectedEditID.id,
//                     {
//                       ...values,
//                       attachmentId: res.attachmentId,
//                     }
//                   )
//                 );
//               })
//               .catch((err) => {
//                 console.log(err);
//               })
//           : dispatch(
//               updateAction("question", UPDATE_FAQ, selectedEditID.id, {
//                 ...values,
//                 attachmentId: selectedEditID.attachment.id,
//               })
//             );
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info);
//       });
//   };

//   const editHandleCancel = () => {
//     setEditVisible(false);
//   };

//   const showCreateModal = () => {
//     setCreateVisible(true);
//   };

//   const createHandleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         form.resetFields();
//         setCreateVisible(false);
//         uploadImage(attachment).then((res) => {
//           dispatch(
//             createAction("question", CREATE_FAQ, {
//               name: values.name,
//               nameRu: values.nameRu,
//               description: values.description,
//               descriptionRu: values.descriptionRu,
//               attachmentId: res.attachmentId,
//             })
//           );
//           dispatch(getAction("question", GET_FAQ));
//           setAnswerUZInp('')
//           setAnswerENInp('')
//           setAnswerRUInp('')
//           setDescriptionRuInp('')
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const createHandleCancel = () => {
//     setCreateVisible(false);
//   };

//   const columns = [
//     { title: "Savol Uz", dataIndex: "answer_uz", key: "answer_uz" },
//     { title: "Savol En", dataIndex: "answer_en", key: "answer_en" },
//     { title: "Savol Ru", dataIndex: "answer_ru", key: "answer_ru" },
//     { title: "Savol Uz", dataIndex: "question_uz", key: "question_uz" },
//     { title: "Savol En", dataIndex: "question_en", key: "question_en" },
//     { title: "Savol Ru", dataIndex: "question_ru", key: "question_ru" },
//     {
//       title: (
//         <>
//           <Button type="primary" onClick={showCreateModal}>
//             <AddBoxIcon />
//           </Button>
//           <Modal
//             title={"Yaratish"}
//             visible={createVisible}
//             onOk={createHandleOk}
//             // confirmLoading={createConfirmLoading}
//             onCancel={createHandleCancel}
//             okText={"yaratish"}
//             cancelText={"bekor qilish"}
//             htmlType="submit"
//           >
//             <Form
//               form={form}
//               layout="vertical"
//               name="form_in_modal"
//               initialValues={{
//                 modifier: "public",
//               }}
//               fields={[
//                 {
//                   name: ["answerUz"],
//                   value: answerUZInp,
//                 },
//                 {
//                   name: ["answerEn"],
//                   value: answerEnInp,
//                 },
//                 {
//                   name: ["answerRu"],
//                   value: answerRUInp,
//                 },
//                 {
//                   name: ["question_uz"],
//                   value: question_uz,
//                 },
//                 {
//                   name: ["question_en"],
//                   value: question_en,
//                 },
//                 {
//                   name: ["question_ru"],
//                   value: question_ru,
//                 },
//               ]}
//             >

//               <FieldHelpers
//                 label="Nom Uz"
//                 name="name"
//                 message="Iltimos Nom Uz qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Nom Ru"
//                 name="nameRu"
//                 message="Iltimos Nom Ru qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Tavsif Uz"
//                 name="description"
//                 message="Iltimos Tavsif Uz qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Tavsif Ru"
//                 name="descriptionRu"
//                 message="Iltimos Tavsif Ru qatorini yo'ldiring!"
//               />
//             </Form>
//           </Modal>
//         </>
//       ),
//       dataIndex: "",
//       key: "x",
//       render: (text) => (
//         <>
//           <Button type="danger" onClick={(e) => showModal(text.id)}>
//             <DeleteOutlined />
//           </Button>
//           <Button type="primary" onClick={(e) => showEditModal(text)}>
//             <EditOutlined />
//           </Button>
//           <Modal
//             title={"O'chirish"}
//             visible={visible}
//             onOk={handleOk}
//             confirmLoading={confirmLoading}
//             onCancel={handleCancel}
//             okText={"o'chirish"}
//             okType={"danger"}
//             cancelText={"bekor qilish"}
//           >
//             <h2>Haqiqatan ham bu ma'lumotni o'chirib tashlamoqchimisiz?</h2>
//             <p>
//               Agar siz ushbu ma'lumotlarni o'chirib tashlasangiz, qayta
//               tiklanmaydi
//             </p>
//           </Modal>
//           <Modal
//             title={"Tahrirlash"}
//             visible={editVisible}
//             onOk={editHandleOk}
//             onCancel={editHandleCancel}
//             okText={"tahrirlash"}
//             cancelText={"bekor qilish"}
//           >
//             <Form
//               form={form}
//               layout="vertical"
//               name="name"
//               initialValues={{
//                 modifier: "public",
//               }}
//               fields={[
//                 {
//                   name: ["answer_uz"],
//                   value: answer_uz,
//                 },
//                 {
//                   name: ["answer_en"],
//                   value: answer_en,
//                 },
//                 {
//                   name: ["answer_ru"],
//                   value: answer_ru,
//                 },
//                 {
//                   name: ["description"],
//                   value: description,
//                 },
//                 {
//                   name: ["descriptionRu"],
//                   value: descriptionRu,
//                 },
//               ]}
//             >
//               <FieldHelpers
//                 label="Nom Uz"
//                 name="name"
//                 message="Iltimos Nom Uz qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Nom Ru"
//                 name="nameRu"
//                 message="Iltimos Nom Ru qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Tavsif Uz"
//                 name="description"
//                 message="Iltimos Tavsif Uz qatorini yo'ldiring!"
//               />
//               <FieldHelpers
//                 label="Tavsif Ru"
//                 name="descriptionRu"
//                 message="Iltimos Tavsif Ru qatorini yo'ldiring!"
//               />
//             </Form>
//           </Modal>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Content style={{ margin: "0 16px" }}>
//         <BreadcrumbHelpers to={"ourService"} from={"home"} />

//         <Table columns={columns} dataSource={data} />
//       </Content>
//     </>
//   );
// };
