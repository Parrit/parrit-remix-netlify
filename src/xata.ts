// Generated by Xata Codegen 0.30.1. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Banners",
    checkConstraints: {
      Banners_xata_id_length_xata_id: {
        name: "Banners_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Banners_xata_id_key: {
        name: "_pgroll_new_Banners_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "action_text",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "action_url",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "paragraphs",
        type: "multiple",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "title",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "PairingBoardRoles",
    checkConstraints: {
      PairingBoardRoles_xata_id_length_xata_id: {
        name: "PairingBoardRoles_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      pairing_board_id_link: {
        name: "pairing_board_id_link",
        columns: ["pairing_board_id"],
        referencedTable: "PairingBoards",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_PairingBoardRoles_xata_id_key: {
        name: "_pgroll_new_PairingBoardRoles_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "pairing_board_id",
        type: "link",
        link: { table: "PairingBoards" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"PairingBoards"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "PairingBoards",
    checkConstraints: {
      PairingBoards_xata_id_length_xata_id: {
        name: "PairingBoards_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      project_id_link: {
        name: "project_id_link",
        columns: ["project_id"],
        referencedTable: "Projects",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_PairingBoards_xata_id_key: {
        name: "_pgroll_new_PairingBoards_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "exempt",
        type: "bool",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "project_id",
        type: "link",
        link: { table: "Projects" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Projects"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "PairingHistory",
    checkConstraints: {
      pairing_history_restamped_xata_id_length_xata_id: {
        name: "pairing_history_restamped_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      project_id_link: {
        name: "project_id_link",
        columns: ["project_id"],
        referencedTable: "Projects",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_pairing_history_restamped_xata_id_key: {
        name: "_pgroll_new_pairing_history_restamped_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "pairing_board_name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "project_id",
        type: "link",
        link: { table: "Projects" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Projects"}',
      },
      {
        name: "timestamp",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "PairingHistory_Persons",
    checkConstraints: {
      PairingHistory_People_xata_id_length_xata_id: {
        name: "PairingHistory_People_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      pairing_history_id_link: {
        name: "pairing_history_id_link",
        columns: ["pairing_history_id"],
        referencedTable: "PairingHistory",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
      person_id_link: {
        name: "person_id_link",
        columns: ["person_id"],
        referencedTable: "Persons",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_PairingHistory_People_xata_id_key: {
        name: "_pgroll_new_PairingHistory_People_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "pairing_history_id",
        type: "link",
        link: { table: "PairingHistory" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"PairingHistory"}',
      },
      {
        name: "person_id",
        type: "link",
        link: { table: "Persons" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Persons"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Persons",
    checkConstraints: {
      Persons_xata_id_length_xata_id: {
        name: "Persons_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      pairing_board_id_link: {
        name: "pairing_board_id_link",
        columns: ["pairing_board_id"],
        referencedTable: "PairingBoards",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
      project_id_link: {
        name: "project_id_link",
        columns: ["project_id"],
        referencedTable: "Projects",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Persons_xata_id_key: {
        name: "_pgroll_new_Persons_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "pairing_board_id",
        type: "link",
        link: { table: "PairingBoards" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"PairingBoards"}',
      },
      {
        name: "project_id",
        type: "link",
        link: { table: "Projects" },
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Projects"}',
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Project_Banners",
    checkConstraints: {
      Project_Banners_xata_id_length_xata_id: {
        name: "Project_Banners_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {
      bann_id_link: {
        name: "bann_id_link",
        columns: ["banner_id"],
        referencedTable: "Banners",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
      project_id_link: {
        name: "project_id_link",
        columns: ["project_id"],
        referencedTable: "Projects",
        referencedColumns: ["xata_id"],
        onDelete: "SET NULL",
      },
    },
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Project_Banners_xata_id_key: {
        name: "_pgroll_new_Project_Banners_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "banner_id",
        type: "link",
        link: { table: "Banners" },
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Banners"}',
      },
      {
        name: "project_id",
        type: "link",
        link: { table: "Projects" },
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: '{"xata.link":"Projects"}',
      },
      {
        name: "seen_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
  {
    name: "Projects",
    checkConstraints: {
      Projects_xata_id_length_xata_id: {
        name: "Projects_xata_id_length_xata_id",
        columns: ["xata_id"],
        definition: "CHECK ((length(xata_id) < 256))",
      },
    },
    foreignKeys: {},
    primaryKey: [],
    uniqueConstraints: {
      _pgroll_new_Projects_xata_id_key: {
        name: "_pgroll_new_Projects_xata_id_key",
        columns: ["xata_id"],
      },
    },
    columns: [
      {
        name: "name",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "password",
        type: "text",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "{}",
      },
      {
        name: "xata_createdat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: "('rec_'::text || (xata_private.xid())::text)",
        comment: "",
      },
      {
        name: "xata_updatedat",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: "now()",
        comment: "",
      },
      {
        name: "xata_version",
        type: "int",
        notNull: true,
        unique: false,
        defaultValue: "0",
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Banners = InferredTypes["Banners"];
export type BannersRecord = Banners & XataRecord;

export type PairingBoardRoles = InferredTypes["PairingBoardRoles"];
export type PairingBoardRolesRecord = PairingBoardRoles & XataRecord;

export type PairingBoards = InferredTypes["PairingBoards"];
export type PairingBoardsRecord = PairingBoards & XataRecord;

export type PairingHistory = InferredTypes["PairingHistory"];
export type PairingHistoryRecord = PairingHistory & XataRecord;

export type PairingHistoryPersons = InferredTypes["PairingHistory_Persons"];
export type PairingHistoryPersonsRecord = PairingHistoryPersons & XataRecord;

export type Persons = InferredTypes["Persons"];
export type PersonsRecord = Persons & XataRecord;

export type ProjectBanners = InferredTypes["Project_Banners"];
export type ProjectBannersRecord = ProjectBanners & XataRecord;

export type Projects = InferredTypes["Projects"];
export type ProjectsRecord = Projects & XataRecord;

export type DatabaseSchema = {
  Banners: BannersRecord;
  PairingBoardRoles: PairingBoardRolesRecord;
  PairingBoards: PairingBoardsRecord;
  PairingHistory: PairingHistoryRecord;
  PairingHistory_Persons: PairingHistoryPersonsRecord;
  Persons: PersonsRecord;
  Project_Banners: ProjectBannersRecord;
  Projects: ProjectsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Anthony-Dreessen-s-workspace-n4lug6.us-east-1.xata.sh/db/parrit-remix",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
