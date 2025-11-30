import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { UserOutlined, DollarOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeModal = ({ open, onCreate, onCancel, loading }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onCreate(values); // Enviamos los datos al padre
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
                    <Input placeholder="171..." />
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
                        <InputNumber style={{ width: '100%' }} prefix={<DollarOutlined />} />
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