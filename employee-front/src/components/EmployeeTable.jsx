import { Table, Space, Button, Tooltip, Popconfirm } from 'antd';
import { IdcardOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const EmployeeTable = ({ employees, loading, onEdit, onDelete }) => {

    const columns = [
        {
            title: 'Cédula',
            dataIndex: 'docNumber',
            key: 'docNumber',
            render: t => <Space><IdcardOutlined /> {t}</Space>
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Apellido',
            dataIndex: 'surname',
            key: 'surname',
            sorter: (a, b) => a.surname.localeCompare(b.surname)
        },
        {
            title: 'Depto',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'IT', value: 'IT' },
                { text: 'Ventas', value: 'Ventas' },
                { text: 'RRHH', value: 'Recursos Humanos' },
                { text: 'Finanzas', value: 'Finanzas' },
                { text: 'Producción', value: 'Producción' }
            ],
            onFilter: (value, record) => record.department.indexOf(value) === 0
        },
        {
            title: 'Salario',
            dataIndex: 'salary',
            key: 'salary',
            render: v => <span style={{ color: 'green' }}>${v}</span>
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <Space>

                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    >
                        Editar
                    </Button>


                    {/* BOTÓN ELIMINAR CON CONFIRMACIÓN */}
                    <Popconfirm
                        title="¿Eliminar empleado?"
                        description={`¿Seguro que deseas eliminar a ${record.name}?`}
                        onConfirm={() => onDelete(record.docNumber)}
                        okText="Sí, eliminar"
                        cancelText="Cancelar"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                        >
                            Eliminar
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const handleEdit = (record) => {
        console.log('Editar', record);
    };
    const handleDelete = (docNumber) => {
        console.log('Eliminar', docNumber);
    };
    return (
        <Table
            columns={columns}
            dataSource={employees}
            rowKey="docNumber"
            loading={loading}
            pagination={{ pageSize: 6 }}
            scroll={{ x: 700 }}
        />
    );
};

export default EmployeeTable;