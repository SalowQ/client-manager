import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CardGrid,
  ClientCard,
  Input,
  Modal,
  Pagination,
} from "ui/components";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../api";
import type { ApiClient, CreateClientPayload } from "../api/types";
import { useSelectedClients, type Client } from "../components/ClientsLayout";
import { formatMoney, formatMoneyNumber } from "../lib/utils";

type FormField = "name" | "salary" | "companyValuation";

type ClientFormData = {
  name: string;
  salary: string;
  companyValuation: string;
};

const CLIENTS_PER_PAGE_OPTIONS = [8, 16, 32, 64];

const ListClients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clientsPerPage, setClientsPerPage] = useState(
    CLIENTS_PER_PAGE_OPTIONS[1]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  const { selectedClients, toggleSelectClient } = useSelectedClients();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", currentPage, clientsPerPage],
    queryFn: () => getAllClients(currentPage, clientsPerPage),
  });

  const clients = data?.clients ?? [];
  const totalPages = data?.totalPages ?? 1;

  function handleCloseModal() {
    setModalOpen(false);
    setEditingClient(null);
    reset();
  }

  function handleCloseDeleteModal() {
    setDeleteModalOpen(false);
    setDeletingClient(null);
  }

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"], exact: false });
      handleCloseModal();
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ApiClient> }) =>
      updateClient(id, data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"], exact: false });
      handleCloseModal();
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: deleteClient,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"], exact: false });
      handleCloseDeleteModal();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<ClientFormData>({
    defaultValues: { name: "", salary: "", companyValuation: "" },
  });

  function handleMaskedChange(
    field: FormField,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const raw = e.target.value.replace(/\D/g, "");
    const num = Number(raw);
    if (!raw || num === 0) {
      setValue(field, "");
      if (errors[field]) clearErrors(field);
      return;
    }
    setValue(field, formatMoney(e.target.value));
    register(field).onChange(e);
    if (errors[field]) clearErrors(field);
  }

  function renderInput({
    label,
    name,
    placeholder,
    maskMoney = false,
    type = "text",
  }: {
    label: string;
    name: FormField;
    placeholder: string;
    maskMoney?: boolean;
    type?: string;
  }) {
    return (
      <label className="flex flex-col text-sm">
        {label}
        <Input
          className="border rounded px-2 py-1 mt-1"
          type={type}
          placeholder={placeholder}
          {...register(name, { required: `Preencha o ${label.toLowerCase()}` })}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? errors[name].message : undefined}
          inputMode={maskMoney ? "numeric" : undefined}
          onChange={
            maskMoney
              ? (e) => handleMaskedChange(name, e)
              : (e) => {
                  register(name).onChange(e);
                  if (errors[name]) clearErrors(name);
                }
          }
        />
      </label>
    );
  }

  const totalClients = clients.length;

  const handleClientsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setClientsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  function handleEditClient(client: Client) {
    setEditingClient(client);
    setModalOpen(true);
  }

  function handleDeleteClient(client: Client) {
    setDeletingClient(client);
    setDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (deletingClient) {
      deleteClientMutation.mutate(deletingClient.id);
    }
  }

  useEffect(() => {
    if (editingClient) {
      setValue("name", editingClient.name);
      setValue("salary", formatMoneyNumber(editingClient.salary));
      setValue(
        "companyValuation",
        formatMoneyNumber(editingClient.companyValuation)
      );
    } else {
      reset();
    }
  }, [editingClient, setValue, reset]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-lg">Carregando clientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-lg text-red-500">
          Erro ao carregar clientes. Tente novamente.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1">
        <main className="w-full mt-4 md:mt-6 px-18">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              <span className="font-bold">{totalClients}</span> clientes
              encontrados:
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Clientes por página:</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={clientsPerPage}
                onChange={handleClientsPerPageChange}
              >
                {CLIENTS_PER_PAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <CardGrid>
            {clients.map((c: Client) => (
              <ClientCard
                key={c.id}
                name={c.name}
                salary={formatMoneyNumber(c.salary)}
                company={formatMoneyNumber(c.companyValuation)}
                onAdd={() => toggleSelectClient(c)}
                isSelected={selectedClients.includes(c.id)}
                onEdit={() => handleEditClient(c)}
                onDelete={() => handleDeleteClient(c)}
              />
            ))}
          </CardGrid>
          <div className="flex flex-col items-center mt-8 gap-4">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Criar cliente
            </Button>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
      <Modal
        open={modalOpen}
        title={editingClient ? "Editar cliente" : "Criar cliente"}
        onClose={handleCloseModal}
      >
        <form
          className="flex flex-col gap-3 p-4"
          onSubmit={handleSubmit((data: ClientFormData) => {
            const createPayload: CreateClientPayload = {
              name: data.name,
              salary: parseFloat(data.salary.replace(/\D/g, "")) / 100,
              companyValuation:
                parseFloat(data.companyValuation.replace(/\D/g, "")) / 100,
            };

            if (editingClient) {
              updateClientMutation.mutate({
                id: editingClient.id,
                data: createPayload,
              });
            } else {
              createClientMutation.mutate(createPayload);
            }
          })}
        >
          {renderInput({
            label: "Nome",
            name: "name",
            placeholder: "Digite o nome:",
          })}
          {renderInput({
            label: "Salário",
            name: "salary",
            placeholder: "Digite o salário:",
            maskMoney: true,
          })}
          {renderInput({
            label: "Valor da empresa",
            name: "companyValuation",
            placeholder: "Digite o valor da empresa:",
            maskMoney: true,
          })}
          <Button
            type="submit"
            className="bg-orange-500 text-white rounded px-4 py-2 mt-2 hover:bg-orange-600"
            disabled={
              createClientMutation.isPending || updateClientMutation.isPending
            }
          >
            {createClientMutation.isPending || updateClientMutation.isPending
              ? "Salvando..."
              : editingClient
              ? "Editar cliente"
              : "Criar cliente"}
          </Button>
        </form>
      </Modal>
      {deletingClient && (
        <Modal
          open={deleteModalOpen}
          title="Excluir cliente:"
          onClose={handleCloseDeleteModal}
        >
          <div className="p-4">
            <p>
              Você está prestes a excluir o cliente:{" "}
              <b>{deletingClient.name}</b>
            </p>
            <Button
              className="bg-orange-500 text-white rounded px-4 py-2 mt-4 w-full hover:bg-orange-600"
              onClick={handleConfirmDelete}
              disabled={deleteClientMutation.isPending}
            >
              {deleteClientMutation.isPending
                ? "Excluindo..."
                : "Excluir cliente"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ListClients;
