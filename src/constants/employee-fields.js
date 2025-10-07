export const EMPLOYEE_FIELDS = [
  {
    key: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    align: 'left',
    highlight: true
  },
  {
    key: "lastName",
    label: "Last Name",
    type: "text",
    required: false,
    highlight: true
  },
  {
    key: "dateOfEmployment",
    label: "Date of Employment",
    type: "date",
    required: true,
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    key: "department",
    label: "Department",
    type: "select",
    required: true,
    options: [
      { value: "Analytics", label: "Analytics" },
      { value: "Tech", label: "Tech" },
      { value: "HR", label: "HR" },
    ],
  },
  {
    key: "position",
    label: "Position",
    type: "select",
    required: true,
    options: [
      { value: "Junior", label: "Junior" },
      { value: "Medior", label: "Medior" },
      { value: "Senior", label: "Senior" },
    ],
  },
];
