import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const { Option } = Select;

const EmployeeModal = ({ open, onEditCreate, onCancel, loading, initialValues }) => {

    const [form] = Form.useForm();
    const isEditing = !!initialValues;


    useEffect(() => {
        if (open) {
            if (initialValues) {
                // Si hay datos, rellenamos el formulario
                form.setFieldsValue(initialValues);
            } else {
                // Si no hay datos (es nuevo), limpiamos los campos
                form.resetFields();
            }
        }
    }, [open, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onEditCreate(values);
            form.resetFields(); // Limpiamos si todo salió bien
        } catch (error) {
            console.log('Validación fallida:', error);
        }
    };

    return (
        <Modal
            title="Nuevo Empleado"
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="docNumber" label="Cédula" rules={[{ required: true, len: 10, message: 'Debe tener 10 dígitos' }]}>
                    <Input placeholder="171..." disabled={isEditing} />
                </Form.Item>

                <div style={{ display: 'flex', gap: 10 }}>
                    <Form.Item name="name" label="Nombre" style={{ flex: 1 }} rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="surname" label="Apellido" style={{ flex: 1 }} rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                </div>

                <Form.Item name="department" label="Departamento" rules={[{ required: true }]}>
                    <Select placeholder="Seleccione...">
                        <Option value="IT">IT</Option>
                        <Option value="Ventas">Ventas</Option>
                        <Option value="Recursos Humanos">Recursos Humanos</Option>
                        <Option value="Finanzas">Finanzas</Option>
                        <Option value="Producción">Producción</Option>
                    </Select>
                </Form.Item>

                <div style={{ display: 'flex', gap: 10 }}>
                    <Form.Item name="age" label="Edad" style={{ flex: 1 }} rules={[{ required: true, type: 'number', min: 18 }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="salary" label="Salario" style={{ flex: 1 }} rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={1} prefix={<DollarOutlined />} />
                    </Form.Item>
                </div>

                <Form.Item name="position" label="Cargo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeeModal;