type eventData = {
  name: string;
  description: string;
  featureFlag: string;
  createdAt: string;
  updatedAt: string;
};

export type ConfirmCancelModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export type ConfirmDeleteModalProps = {
  formName: string;
  onDelete: () => void;
  onCancel: () => void;
};

export type WebhookFormProps = {
  formData: Omit<eventData, 'createdAt' | 'updatedAt'>;
  setFormData: (data: any) => void;
  prevData?: Omit<eventData, 'createdAt' | 'updatedAt'> | null | undefined;
};

export type WebhookModalProps = {
  show: boolean;
  onHide: (show: boolean) => void;
  onExit: () => void;
  prevData?: Omit<eventData, 'createdAt' | 'updatedAt'> | null | undefined;
};

export type WebhookRowProps = {
  webhookRow: eventData;
  onEdit: (data: eventData) => void;
};

export type WebhooksTableProps = {
  eventData: eventData[];
};
