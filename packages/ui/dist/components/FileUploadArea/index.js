"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const assert_1 = __importDefault(require("assert"));
const styles_1 = require("../../utils/styles");
const Icons_1 = require("../Icons");
const styles_2 = require("./styles");
const formatAcceptExtensions = (accept) => ([...new Set(accept
        .replace('jpeg', 'jpg')
        .split(',')
        .map(e => e.trim().replace(/^\./, '').toUpperCase()))].join(' '));
const getFileExtension = (filename) => {
    if (!filename.includes('.')) {
        return null;
    }
    const ext = filename.split('.').pop();
    if ((0, ts_utils_1.isUndefined)(ext) || ext.length === 0) {
        return null;
    }
    return `.${ext}`.toLowerCase();
};
const isExtensionAllowed = ({ file, accept }) => {
    const ext = getFileExtension(file.name);
    return !(0, ts_utils_1.isNull)(ext) && accept.split(',').includes(ext);
};
const FileUploadArea = ({ className, primaryText, supportedFormatsText, accept, onClick, onFileSelect, onFileReject, }) => {
    const [isDraggingOver, setIsDraggingOver] = (0, react_1.useState)(false);
    const [reject, setReject] = (0, react_1.useState)(false);
    const isRejectResetScheduled = (0, react_1.useRef)(false);
    const dragOverTimeoutRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (reject === false || isRejectResetScheduled.current === true) {
            return;
        }
        const id = window.setTimeout(() => {
            setReject(false);
            isRejectResetScheduled.current = false;
        }, 500);
        isRejectResetScheduled.current = true;
        return () => {
            window.clearTimeout(id);
        };
    }, [reject]);
    const handleReject = (file) => {
        if ((0, ts_utils_1.isUndefined)(onFileReject)) {
            setReject(true);
        }
        else {
            onFileReject({
                file,
                showDefaultRejectionEffect: () => setReject(true),
            });
        }
    };
    const handleFile = (file) => {
        const allowed = isExtensionAllowed({ file, accept });
        if (allowed === false) {
            handleReject(file);
            return;
        }
        (0, assert_1.default)(!(0, ts_utils_1.isUndefined)(onFileSelect), 'Should not happen. |lm4nk6|');
        onFileSelect(file);
    };
    return ((0, jsx_runtime_1.jsxs)(styles_2.Label, { className: className, reject: reject, isDraggingOver: isDraggingOver, onDragOver: e => {
            e.preventDefault();
            if (isDraggingOver === false) {
                setIsDraggingOver(true);
            }
            if (!(0, ts_utils_1.isNull)(dragOverTimeoutRef.current)) {
                window.clearTimeout(dragOverTimeoutRef.current);
                dragOverTimeoutRef.current = null;
            }
            dragOverTimeoutRef.current = window.setTimeout(() => {
                setIsDraggingOver(false);
            }, 100);
        }, onDrop: e => {
            e.preventDefault();
            const file = e.dataTransfer.items.length > 0
                ? e.dataTransfer.items[0]?.getAsFile()
                : e.dataTransfer.files[0];
            if (file instanceof File) {
                handleFile(file);
            }
        }, children: [(0, jsx_runtime_1.jsx)(Icons_1.DropFileIcon, {}), (0, jsx_runtime_1.jsxs)(styles_2.TextContainer, { children: [(0, jsx_runtime_1.jsx)(styles_2.PrimaryText, { children: primaryText }), (0, jsx_runtime_1.jsx)(styles_2.SecondaryText, { children: `${supportedFormatsText} ${formatAcceptExtensions(accept)}` })] }), (0, jsx_runtime_1.jsx)(styles_1.VisuallyHiddenInput, { type: 'file', accept: accept, ...!(0, ts_utils_1.isUndefined)(onClick)
                    ? { onClick }
                    : {
                        onChange: e => {
                            const file = e.target.files?.[0];
                            e.target.value = '';
                            if (file instanceof File) {
                                handleFile(file);
                            }
                        },
                    } })] }));
};
exports.FileUploadArea = FileUploadArea;
//# sourceMappingURL=index.js.map