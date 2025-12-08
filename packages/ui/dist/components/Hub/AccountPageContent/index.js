"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPageContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const ButtonLinkLike_1 = require("../ButtonLinkLike");
const MainForm_1 = require("./components/MainForm");
const ChangeName_1 = require("./components/ChangeName");
const ChangeEmail_1 = require("./components/ChangeEmail");
const ChangePassword_1 = require("./components/ChangePassword");
const DeleteAccountForm_1 = require("./components/DeleteAccountForm");
const styles_1 = require("./styles");
const Dialog_1 = require("../Dialog");
const DialogActions_1 = require("../DialogActions");
const styles_2 = require("../../../utils/styles");
const AccountPageContent = ({ className, user, templateSectionTitle, mainFormTexts, logoutTexts, deleteAccountTexts, changeNameDialogTexts, changeEmailDialogTexts, changePasswordDialogTexts, commonErrorTexts, handlers: { changeNameSubmit, changeEmailSubmit, logout, deleteAccountSubmit, changePasswordSubmit, changeAvatar, }, }) => {
    const [openChangeNameDialog, setOpenChangeNameDialog] = (0, react_1.useState)(false);
    const [openChangeEmailDialog, setOpenChangeEmailDialog] = (0, react_1.useState)(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = (0, react_1.useState)(false);
    const [openLogoutDialog, setOpenLogoutDialog] = (0, react_1.useState)(false);
    const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = (0, react_1.useState)(false);
    const fileInputRef = (0, react_1.useRef)(null);
    const handleLogoutCancel = () => setOpenLogoutDialog(false);
    const handleLogoutClickConfirm = () => {
        setOpenLogoutDialog(false);
        logout();
    };
    const handleDeleteAccountCancel = () => setOpenDeleteAccountDialog(false);
    const changeNameDialogClose = (0, react_1.useCallback)(() => {
        setOpenChangeNameDialog(false);
    }, []);
    const changeEmailDialogClose = (0, react_1.useCallback)(() => {
        setOpenChangeEmailDialog(false);
    }, []);
    const changePasswordDialogClose = (0, react_1.useCallback)(() => {
        setOpenChangePasswordDialog(false);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(styles_1.PaddedTitledIsle, { className: className, type: 'always-static', title: templateSectionTitle, children: [(0, jsx_runtime_1.jsxs)(styles_1.AvatarAndFormContainer, { children: [(0, jsx_runtime_1.jsxs)(styles_1.AvatarContainer, { children: [(0, jsx_runtime_1.jsx)(styles_1.AvatarButton, { onClick: () => {
                                            if (!(0, ts_utils_1.isNull)(fileInputRef.current)) {
                                                fileInputRef.current.click();
                                            }
                                        }, children: (0, jsx_runtime_1.jsx)(styles_1.Avatar, { src: (0, ts_utils_1.isNull)(user.avatar) ? '' : user.avatar, alt: user.name }) }), (0, jsx_runtime_1.jsx)(styles_2.VisuallyHiddenInput, { ref: fileInputRef, type: 'file', accept: 'image/png,image/jpeg', onChange: e => {
                                            const file = e.target.files?.[0];
                                            e.target.value = '';
                                            if (file instanceof File) {
                                                changeAvatar(file);
                                            }
                                        } })] }), (0, jsx_runtime_1.jsx)(styles_1.MainFormContainer, { children: (0, jsx_runtime_1.jsx)(MainForm_1.MainForm, { formFields: {
                                        fullName: { text: mainFormTexts.fields.fullName, value: user.name },
                                        email: { text: mainFormTexts.fields.email, value: user.email },
                                    }, buttons: {
                                        changeName: {
                                            text: mainFormTexts.buttons.changeName,
                                            handler: () => setOpenChangeNameDialog(true),
                                        },
                                        changeEmail: {
                                            text: mainFormTexts.buttons.changeEmail,
                                            handler: () => setOpenChangeEmailDialog(true),
                                        },
                                        changePassword: {
                                            text: mainFormTexts.buttons.changePassword,
                                            handler: () => setOpenChangePasswordDialog(true),
                                        },
                                    }, passwordLess: user.passwordLess }) })] }), (0, jsx_runtime_1.jsxs)(styles_1.BottomLinksContainer, { children: [(0, jsx_runtime_1.jsx)(ButtonLinkLike_1.ButtonLinkLike, { icon: 'logout', text: logoutTexts.bottomLink, onClick: () => setOpenLogoutDialog(true), state: 'active', version: 'smaller' }), (0, jsx_runtime_1.jsx)(ButtonLinkLike_1.ButtonLinkLike, { icon: 'delete', text: deleteAccountTexts.bottomLink, onClick: () => setOpenDeleteAccountDialog(true), state: 'active', version: 'smaller' })] })] }), (0, jsx_runtime_1.jsx)(Dialog_1.Dialog, { open: openChangeNameDialog, onClose: changeNameDialogClose, title: changeNameDialogTexts.title, children: (0, jsx_runtime_1.jsx)(ChangeName_1.ChangeNameForm, { handleCancel: changeNameDialogClose, buttons: changeNameDialogTexts.formTexts.buttons, formFields: changeNameDialogTexts.formTexts.formFields, commonErrorTexts: commonErrorTexts, handleSubmit: async (data) => {
                        const res = await changeNameSubmit(data);
                        if (res.ok === false) {
                            return res.errors ?? {};
                        }
                        changeNameDialogClose();
                        return {};
                    } }) }), (0, jsx_runtime_1.jsx)(Dialog_1.Dialog, { open: openChangeEmailDialog, onClose: changeEmailDialogClose, title: changeEmailDialogTexts.title, children: (0, jsx_runtime_1.jsx)(ChangeEmail_1.ChangeEmailForm, { handleCancel: changeEmailDialogClose, buttons: changeEmailDialogTexts.formTexts.buttons, formFields: changeEmailDialogTexts.formTexts.formFields, description: {
                        text: changeEmailDialogTexts.description,
                    }, commonErrorTexts: commonErrorTexts, handleSubmit: async (data) => {
                        const res = await changeEmailSubmit(data);
                        if (res.ok === false) {
                            return res.errors ?? {};
                        }
                        changeEmailDialogClose();
                        return {};
                    } }) }), (0, jsx_runtime_1.jsx)(Dialog_1.Dialog, { open: openLogoutDialog, onClose: handleLogoutCancel, title: logoutTexts.dialog.title, children: (0, jsx_runtime_1.jsx)(DialogActions_1.DialogActions, { primaryActionText: logoutTexts.dialog.buttons.confirm, onPrimaryAction: handleLogoutClickConfirm, secondaryActionText: logoutTexts.dialog.buttons.cancel, onSecondaryAction: handleLogoutCancel }) }), (0, jsx_runtime_1.jsx)(Dialog_1.Dialog, { open: openDeleteAccountDialog, onClose: handleDeleteAccountCancel, title: deleteAccountTexts.dialog.title, children: (0, jsx_runtime_1.jsx)(DeleteAccountForm_1.DeleteAccountForm, { buttons: {
                        confirm: { text: deleteAccountTexts.dialog.buttons.confirm },
                        cancel: { text: deleteAccountTexts.dialog.buttons.cancel },
                    }, description: {
                        text: deleteAccountTexts.dialog.description,
                        text2: deleteAccountTexts.dialog.description2,
                    }, commonErrorTexts: commonErrorTexts, formFields: { password: { text: deleteAccountTexts.dialog.passwordField } }, handleSubmit: async (data) => {
                        const res = await deleteAccountSubmit(data);
                        if (res.ok === false) {
                            return res.errors ?? {};
                        }
                        handleDeleteAccountCancel();
                        return {};
                    }, handleCancel: handleDeleteAccountCancel, passwordLess: user.passwordLess }) }), (0, jsx_runtime_1.jsx)(Dialog_1.Dialog, { open: openChangePasswordDialog, onClose: changePasswordDialogClose, title: changePasswordDialogTexts.title, children: (0, jsx_runtime_1.jsx)(ChangePassword_1.ChangePasswordForm, { handleCancel: changePasswordDialogClose, buttons: changePasswordDialogTexts.formTexts.buttons, formFields: changePasswordDialogTexts.formTexts.formFields, commonErrorTexts: commonErrorTexts, handleSubmit: async (data) => {
                        const res = await changePasswordSubmit(data);
                        if (res.ok === false) {
                            return res.errors ?? {};
                        }
                        changePasswordDialogClose();
                        return {};
                    } }) })] }));
};
exports.AccountPageContent = AccountPageContent;
//# sourceMappingURL=index.js.map