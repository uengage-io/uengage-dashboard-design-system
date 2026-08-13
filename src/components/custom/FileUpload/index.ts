export {
  FileUpload,
  type FileUploadProps,
  type FileUploadVariant,
  type FileUploadSize,
  type FileUploadLocalFile,
  type FileUploadItem,
} from "./FileUpload";

export {
  // ── Design spec ──
  FILE_UPLOAD_COLORS,
  FILE_UPLOAD_SIZES,
  FILE_UPLOAD_STATUS_STYLES,
  FILE_UPLOAD_TRANSITION,
  PROGRESS_TRANSITION,
  IN_FLIGHT_STATUSES,
  FAILED_STATUSES,
  getDropzoneStyle,
  getFileExt,
  truncateMiddle,
  BROWSE_HINT,
  type FileUploadStatus,
  type FileUploadTone,
  type FileUploadSizeKey,
  type FileUploadSizeSpec,
  type FileUploadStatusSpec,
  type DropzoneStyle,

  // ── Legacy ──
  dropzoneVariants,
  iconWrapperVariants,
  avatarContainerVariants,
  ICON_SIZES,
  AVATAR_ICON_SIZES,
  PLACEHOLDER_TEXT,
} from "./fileUploadVariants";
