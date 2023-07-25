import React, { useState, useMemo, useEffect, memo, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import { FormattedMessage } from 'react-intl';
import { Cell, Column } from 'react-table';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import Promise from 'bluebird';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';
import { MenuOutlined } from '@ant-design/icons';
import { Grid, SelectChangeEvent, Stack } from '@mui/material';
import { RootState } from '../../../store';
import { resetRowIds } from '../../../store/reducers/brovisorTable';
import { setRunProfileId, setFailedProfileId, setStopProfileId } from '../../../store/reducers/nameCell';
import { setFirstProxies } from '../../../store/reducers/proxyCell';
import { setCheckedIds } from '../../../store/reducers/exportCookies';
import { setSelectedFolder } from '../../../store/reducers/brovisorFolder';
import { resetSearchValue, setSearchValue } from '../../../store/reducers/searchValue';
import { setCurrentPage, setItemCount, setLastPage } from '../../../store/reducers/pagination';
import { setUsersInfo } from '../../../store/reducers/userInfo';
import { echo, socket } from '../../../App';
import BrovisorTable from '../../../components/brovisorTable/BrovisorTable';
import AlertDialog from '../../../components/modals/bulkDeleteAlertDialog/BulkDeleteAlertDialog';
import DeleteAlertDialog from '../../../components/modals/deleteAlertDialog/DeleteAlertDialog';
import SettingsDropdown from '../../../components/common/settingsDropdown/SettingsDropdown';
import BulkProxyModal from '../../../components/common/bulkProxyModal/BulkProxyModal';
import TagsCellWrapper from '../../../components/pages/browserProfiles/tagsCellWrapper/TagsCellWrapper';
import NamesCellWrapper from '../../../components/pages/browserProfiles/namesCellWraper/NamesCellWrapper';
import ProxyCellWrapper from '../../../components/pages/browserProfiles/proxyCellWrapper/ProxyCellWrapper';
import NotesCellWrapper from '../../../components/pages/browserProfiles/notesCellWrapper/NotesCellWrapper';
import StatusCellWrapper from '../../../components/pages/browserProfiles/statusCellWrapper/StatusCellWrapper';
import BrovisorPageHeader from '../../../components/brovisorPageHeader/BrovisorPageHeader';
import BrovisorFolder from '../../../components/brovisorFolder/BrovisorFolder';
import { getUpdatedColumn } from '../../../utils/getColumns';
import { BrovisorFolderTypes } from '../../../types/brovisorFolder';
import {buildUrl, getAgentPort} from '../../../utils/helpers';
import { logoutWithUnexpectedToken } from '../../../utils/auth';
import { CreateProxyDataTypes, ProxyDataTypes } from '../../../types/proxy';
import { BrowserProfileDataTypes } from '../../../types/browserProfiles';
import ProxyApi from '../../../api/ProxyApi';
import BrowserProfilesApi from '../../../api/BrowserProfilesApi';
import loader from '../../../assets/icons/brovisorTableIcons/loader.svg';
import fontCase from '../../../assets/icons/brovisorTableIcons/fontCase.svg';
import notesText from '../../../assets/icons/brovisorTableIcons/notesText.svg';
import tagsIcon from '../../../assets/icons/brovisorTableIcons/tagsIcon.svg';
import proxyIcon from '../../../assets/icons/brovisorTableIcons/proxyIcon.svg';
import AddFolder from '../../../assets/icons/bulkOperation/addFolder.svg';
import RunButton from '../../../assets/icons/bulkOperation/runButton.svg';
import PauseButton from '../../../assets/icons/bulkOperation/pauseButton.svg';
import EditPen from '../../../assets/icons/helperIcons/editPen.svg';
import AddTags from '../../../assets/icons/bulkOperation/addTags.svg';
import ChangeProxy from '../../../assets/icons/bulkOperation/changeProxy.svg';
import ExportCookie from '../../../assets/icons/bulkOperation/exportCookie.svg';
import Delete from '../../../assets/icons/bulkOperation/delete.svg';
import browserProfilesIcon from '../../../assets/icons/drawerIcons/browserProfile.svg';
import crossError from '../../../assets/icons/helperIcons/crossError.svg';
import searchIcon from '../../../assets/icons/common/search.svg';
import styles from './browserProfiles.module.css';

export const browserProfilesInitialValues = {
  id: '',
  name: '',
  status: null,
  tags: [],
  folders: [],
  platform: 'windows',
  mainWebsite: { name: 'none'},
  login: '',
  password: '',
  proxy: null,
  userAgent: null,
  cookies: '',
  webrtc: { mode: 'off' },
  canvas: { mode: 'off' },
  webgl: { mode: 'real' },
  webglInfo: { mode: 'manual' },
  clientRect: { mode: 'real' },
  timezone: { mode: 'auto', value: null },
  locale: { mode: 'auto', value: null },
  geoLocation: { mode: 'auto', accuracy: null, latitude: null, longitude: null },
  cpu: { mode: 'manual', value: null },
  memory: { mode: 'manual', value: null },
  screen: { mode: 'auto', resolution: null },
  mediaDevice: { mode: 'manual', audioInputs: 1, audioOutputs: 1, videoInputs: 1 },
  port: { mode: 'real', blacklist: null },
  note: {
    content: '',
    color: 'black',
    icon: '',
    style: 'text'
  },
  isProxyUpdate: false,
  isNoteUpdate: false,
  isCookieUpdate: false
};

export interface socketRunBrowser {
  profileId: string;
}

function BrowserProfiles() {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = createBrowserHistory();
  const navigate = useNavigate();

  const itemCount = useSelector((state: RootState) => state.pagination.itemCount);
  const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
  const lastPage = useSelector((state: RootState) => state.pagination.lastPage);
  const searchValue = useSelector((state: RootState) => state.searchValue.searchValue);
  const idsOfSelectedRows = useSelector((state: RootState) => state.brovisorTableSlice.idsOfSelectedRows);
  const usersInfo = useSelector((state: RootState) => state.userInfo.usersInfo);

  const bulkProxyRef = useRef<HTMLDivElement>(null);

  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [browserProfiles, setBrowserProfiles] = useState<BrowserProfileDataTypes[]>([]);
  const [browserProfilesCount, setBrowserProfilesCount] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<BrowserProfileDataTypes[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showBulkDeleteConfirmation, setShowBulkDeleteConfirmation] = useState<boolean>(false);
  const [openBulkProxyModal, setOpenBulkProxyModal] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const [selectedProfile, setSelectedProfile] = useState<BrowserProfileDataTypes>(browserProfilesInitialValues);
  const [folderIds, setSelectedFolderIds] = useState<string[]>(
    searchParams.get('foldersIds[]') ? [`${searchParams.get('foldersIds[]')}`] : []
  );

  const  bulkOperationsSettings =  {
    settings : [
      {
        icon: <img src={RunButton} alt="Run" /> ,
        func: ()=> { handleBulkClickButton( "start") }
      },
      {
        icon: <img src={PauseButton} alt="Pause" /> ,
        func: ()=> {}
      },
      {
        name: 'bulk-operation-add-folder',
        icon: <img src={AddFolder} alt="Add folder" /> ,
        func: ()=> {}
      },
      {
        name: 'bulk-operation-change-proxy',
        icon: <img src={ChangeProxy}  alt="Change proxy" /> ,
        bulkRef: bulkProxyRef,
        func: () => { setOpenBulkProxyModal( !openBulkProxyModal ) }
      },
      {
        name: 'bulk-operation-add-tags',
        icon: <img src={AddTags} alt="Add tags" /> ,
        func: ()=>{}
      },
      {
        name: 'bulk-operation-export-cookies',
        icon: <img src={ExportCookie} alt="Export Cookie" /> ,
        func: ()=> handleBulkExportCookies(),
      },
      {
        name: 'bulk-operation-delete',
        icon: <img src={Delete}  alt="Delete"/> ,
        func: () => handleBulkDelete(Array.from(idsOfSelectedRows)),
      },
    ],
    selectedItemsCount: idsOfSelectedRows.size
  };

  const columns = useMemo(
    () => [
      {
        maxWidth: 30,
        accessor: 'burger',
        Header: '',
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          return (
            <div
              className={styles.settingsContainer}
              onClick={evt => evt.stopPropagation()}
            >
              <SettingsDropdown
                Icon={MenuOutlined}
                settings={[
                  {
                    name: 'edit-browser-profile',
                    icon: <img src = { EditPen } alt = "Edit Pen" />,
                    func: () => {navigate(`/browser-profiles/${row.original.id}`)}
                  },
                  {
                    name: 'delete-button',
                    icon: <img src = {Delete} alt = "Delete" />,
                    func: () => {deleteOneProfile(row.original)}
                  },
                ]}
              />
            </div>
          )
        },
        disableSortBy: true,
        disableResizing: true,
      },
      {
        minWidth: 100,
        accessor: 'name',
        Header: (
          <Grid container  direction="row" alignItems="center" className={styles.brovisorheaderItemContainer}>
            <img src={fontCase} alt='font Case' className={styles.profileSvgs} />
            <span className={styles.headerNameWrapper}>
              <FormattedMessage id='browser-profile-data-name' />
            </span>
          </Grid>
        ),
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          const profile: BrowserProfileDataTypes = row.original;

          return (
            <NamesCellWrapper
              browserProfile={profile}
              handleSubmit={handleSubmit}
            />
          )
        },
        className: styles.cellCenter,
      },
      {
        minWidth: 90,
        accessor: 'status',
        Header: (
          <Grid container  direction="row" alignItems="center" className={styles.brovisorheaderItemContainer}>
            <img src={loader} alt='loader' className={styles.profileSvgs} />
            <span className={styles.headerNameWrapper}>
              <FormattedMessage id='browser-profile-data-status' />
            </span>
          </Grid>
        ),
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          const profile: BrowserProfileDataTypes = row.original;

          return (
            <StatusCellWrapper
              browserProfile={profile}
              handleSubmit={handleSubmit}
            />
          )
        },
        className: styles.cellCenter,
      },
      {
        minWidth: 90,
        accessor: 'note',
        Header: (
          <Grid
            container
            direction="row"
            alignItems="center"
            className={styles.brovisorheaderItemContainer}
          >
            <img src={notesText} alt='Notes Text' className={styles.profileSvgs} />
            <span className={styles.headerNameWrapper}>
              <FormattedMessage id='browser-profile-data-notes' />
            </span>
          </Grid>
        ),
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          const profile: BrowserProfileDataTypes = row.original;

          return (
            <NotesCellWrapper
              browserProfile={profile}
              handleSubmit={handleSubmit}
            />
          )
        },
        className: styles.cellCenter,
      },
      {
        minWidth: 80,
        accessor: 'tags',
        Header: (
          <Grid container  direction="row" alignItems="center" className={styles.brovisorheaderItemContainer}>
            <img src={tagsIcon} alt='Tags Icon' className={styles.profileSvgs} />
            <span className={styles.headerNameWrapper}>
              <FormattedMessage id='browser-profile-data-tags' />
            </span>
          </Grid>
        ),
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          const profile: BrowserProfileDataTypes = row.original;

          return (
            <TagsCellWrapper
              browserProfile={profile}
              handleSubmit={handleSubmit}
            />
          )
        },
        className: styles.cellCenter,
      },
      {
        minWidth: 150,
        width:150,
        accessor: 'proxy',
        Header: (
          <Grid container  direction="row" alignItems="center" className={styles.brovisorheaderItemContainer}>
            <img src={proxyIcon} alt='Proxy Icon' className={styles.profileSvgs} />
            <span className={styles.headerNameWrapper}>
              <FormattedMessage id='browser-profile-data-proxy' />
            </span>
          </Grid>
        ),
        Cell: ({ row }: Cell<BrowserProfileDataTypes>) => {
          const profile: BrowserProfileDataTypes = row.original

          return (
            <div
              className={styles.proxyCellWrapper}
              onClick={(evt) => evt.stopPropagation()}
            >
              <ProxyCellWrapper
                browserProfile={profile}
                handleSubmitProxyChanges={handleSubmitProxyChanges}
                handleSubmitProfileChanges={handleSubmitProfileChanges}
              />
            </div>
          );
        },
        className: `${styles.cellCenter} teamsInvitedColumn`,
      },
    ], [theme, browserProfiles]
  ) as unknown as Column<BrowserProfileDataTypes>[];

  const [profileColumns, setProfileColumns] = useState<Column<BrowserProfileDataTypes>[]>(columns);

  useEffect(() => {
    return () => {
      dispatch(resetSearchValue());
    }
  }, []);

  const successBrowserProfileHandler = () => {
    getBrowserProfiles('?page=1');
  };

  const successProfileProxyHandler = () => {
    getProxies(`?page=1`);
  };

  const failedBrowserProfileHandler = () => {
    toast.error(<FormattedMessage id="request-error-message" />, {
      icon: <img src={crossError} alt={crossError} />,
    });
  };

  useEffect(() => {
    (async () => {
      await getProxies(`?page=1`);
    })();

    return () => {
      dispatch(resetRowIds());
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (folderIds.length) {
        await getBrowserProfiles(`?foldersIds[]=${folderIds}&page=1&perPage=25`);
      } else {
        const urlParams = new URLSearchParams(location.search);
        urlParams.delete('foldersIds[]');
        await getBrowserProfiles('?'+urlParams.toString());
      }
    })();
  }, [folderIds]);

  useEffect(() => {
    const channel = echo.private('browserProfile');
    const proxyChannel = echo.private('proxy');

    channel.listen('.create.additionalInfo.browserProfile', successBrowserProfileHandler);
    channel.listen('.update.additionalInfo.browserProfile', successBrowserProfileHandler);
    channel.listen('.delete.browserProfile', successBrowserProfileHandler);
    channel.listen('.failed.create.additionalInfo.browserProfile', failedBrowserProfileHandler);
    channel.listen('.failed.update.additionalInfo.browserProfile', failedBrowserProfileHandler);
    channel.listen('.failed.delete.browserProfile', failedBrowserProfileHandler);
    channel.listen('.edit.proxiesOnBrowserProfiles', successBrowserProfileHandler);
    channel.listen('.failed.edit.proxiesOnBrowserProfiles', failedBrowserProfileHandler);
    proxyChannel.listen('.create.proxy', successProfileProxyHandler);
    proxyChannel.listen('.failed.create.proxy', failedBrowserProfileHandler);
    proxyChannel.listen('.update.proxy', successProfileProxyHandler);
    proxyChannel.listen('.failed.update.proxy', failedBrowserProfileHandler);

    return () => {
      channel.stopListening('.create.additionalInfo.browserProfile' );
      channel.stopListening('.update.additionalInfo.browserProfile' );
      channel.stopListening('.delete.browserProfile' );
      channel.stopListening('.failed.create.additionalInfo.browserProfile' );
      channel.stopListening('.failed.update.additionalInfo.browserProfile' );
      channel.stopListening('.failed.delete.browserProfile' );
      channel.stopListening('.edit.proxiesOnBrowserProfiles' );
      channel.stopListening('.failed.edit.proxiesOnBrowserProfiles' );
      proxyChannel.stopListening('.create.proxy' );
      proxyChannel.stopListening('.failed.create.proxy' );
      proxyChannel.stopListening('.update.proxy' );
      proxyChannel.stopListening('.failed.update.proxy' );
    };
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket, "CONNECTED");
    });

    socket.on('browser.started', (data: socketRunBrowser) => {
      dispatch(setRunProfileId(data.profileId));
      console.log("STARTED");
    });

    socket.on('browser.stopped', (data: socketRunBrowser) => {
      dispatch(setStopProfileId(data.profileId));
      console.log("STOPPED");
    });

    socket.on('browser.start.failed', (data: socketRunBrowser) => {
      dispatch(setFailedProfileId(data.profileId));
      console.log('START FAILED');
    });

    socket.on('browser.stop.failed', (data: socketRunBrowser) => {
      console.log('STOP FAILED');
    });
  },[]);

  useEffect(() => {
    const updatedProfileTotalCount = {
      ...usersInfo,
      usages: {
        ...usersInfo.usages,
        browserProfiles: browserProfilesCount
      },
    };

    dispatch(setUsersInfo(updatedProfileTotalCount));
  }, [browserProfilesCount]);

  const getBrowserProfiles = async (query: string) => {

    return BrowserProfilesApi.getAllBrowserProfiles(query)
      .then((res: AxiosResponse) => {
        const { data } = res.data;
        const { current_page, per_page, last_page, total } = res.data.meta;
        let url = buildUrl(`/browser-profiles?page=${current_page}&perPage=${per_page}`);

        if (folderIds.length) {
          url = url+`&foldersIds[]=${folderIds}`
        }

        history.replace(url);
        dispatch(setCurrentPage(current_page));
        dispatch(setLastPage(last_page));
        dispatch(setItemCount(per_page));

        setBrowserProfilesCount(total);
        setBrowserProfiles(data);
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.message;
        logoutWithUnexpectedToken(message || '');
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      })
      .finally(() => {
        setFilterLoading(false);
      });
  };

  const handleSearchProfiles = async (searchValue: string) => {
    setFilterLoading(true);
    dispatch(setSearchValue(searchValue));

    if (folderIds.length) {
      await getBrowserProfiles(`?q=${searchValue}&foldersIds[]=${folderIds}`);
    } else {
      await getBrowserProfiles(`?q=${searchValue}`);
    }
  };

  const getProxies = async (query: string) => {
    return ProxyApi.getAllProxies(query)
      .then((res: AxiosResponse) => {
        const data = res.data.data;
        dispatch(setFirstProxies(data));
      })
      .catch((err: any) => {
        const message = err?.response?.data?.errors?.message;
        logoutWithUnexpectedToken(message || '');
      });
  };

  const handleDeleteBrowserProfile = async (selectedRowIds: string[]) => {
    return BrowserProfilesApi.deleteBrowserProfiles(selectedRowIds)
      .then(() => {
        if ((
          browserProfiles.length === 1
          || selectedItems.length === browserProfiles.length
        ) && currentPage === lastPage) {
          getBrowserProfiles(`?page=${+lastPage - 1}&perPage=${itemCount}`);
        } else {
          getBrowserProfiles(`?page=${currentPage}&perPage=${itemCount}`);
        }

        setShowDeleteConfirmation(false);
        setShowBulkDeleteConfirmation(false);

        toast.success(<FormattedMessage id="browser-profile-success-deleted" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.message;
        logoutWithUnexpectedToken(message || '');
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      });
  };

  const updateBrowserProfile = async (updatedProfile: BrowserProfileDataTypes) => {
    return BrowserProfilesApi.updateBrowserProfile(updatedProfile)
      .then(() => {
        // getBrowserProfiles(location.search);
        toast.success(<FormattedMessage id="browser-profile-success-updated" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      })
      .catch((err) => {
        const message = err?.response?.data?.errors?.message;
        logoutWithUnexpectedToken(message || '');
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      });
  };

  const updateProfileProxy = async (proxy: ProxyDataTypes) => {
    const { name, type, host, port, login, password, changeIpUrl } = proxy;
    const updatedProxy: CreateProxyDataTypes = {
      name,
      type,
      host,
      port,
      login,
      password,
      changeIpUrl,
    };

    return ProxyApi.updateProxy(proxy.id, updatedProxy)
      .then(() => {
        getBrowserProfiles(location.search);

        toast.success(<FormattedMessage id="browser-profile-success-updated" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      })
      .catch((err: any) => {
        const message = err?.response?.data?.errors?.message;
        logoutWithUnexpectedToken(message || '');
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      });
  };

  const handleSaveBulkProxyChanges = ( proxy: ProxyDataTypes | null ) => {
    const browserProfileIds = Array.from( idsOfSelectedRows );
    const updatedProxies = proxy ? [{...proxy, action: 'add' }] : [];

    return ProxyApi.addProfileBulkProxies( updatedProxies, browserProfileIds )
      .then( () => {
        dispatch(resetRowIds());
        toast.success(<FormattedMessage id="proxy-success-updated" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      } )
      .catch( err => {
        const { message } = err.response.data.errors;
        logoutWithUnexpectedToken(message);
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      } );
  };

  const exportSelectedProfileCookies = async (browserProfileId: string) => {

    return BrowserProfilesApi.exportCookies(browserProfileId)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const blob = new Blob([JSON.stringify(response.data)], {
            type: 'text/plain;charset=utf-8',
          });
          saveAs(blob, `brovisor-${browserProfileId}.txt`);
        } else {
          saveAs(new Blob([], {type: 'text/plain;charset=utf-8'}), `brovisor-${browserProfileId}.txt`);
        }

        dispatch(resetRowIds());
        toast.success(<FormattedMessage id="browser-profile-bulk-export-cookie-successfully" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      })
      .catch((err) => {
        const { message } = err.response.data.errors;
        logoutWithUnexpectedToken(message);
        toast.error(<FormattedMessage id="request-error-message" />, {
          icon: <img src={crossError} alt={crossError} />,
        });
      });
  };

  const handleExportCookies = async (selectedRowIds: string[]) => {
    console.log('selectedRowIds', selectedRowIds)
    dispatch(setCheckedIds(selectedRowIds));

    await Promise.map(selectedRowIds, async element => {
      try {
        return await exportSelectedProfileCookies(element);
      } catch (error) {}
    });

    dispatch(setCheckedIds([]));
  };

  const handleBulkExportCookies = async () => {
    await handleExportCookies(Array.from(idsOfSelectedRows));
  };

  const handleBulkClickButton = ( mode: string) => {
    const profileIds = Array.from(idsOfSelectedRows)
    const agentPort = getAgentPort();

    if (token && agentPort && mode === "start") {
      const promises = profileIds.map(profileId => BrowserProfilesApi.runBrowser(agentPort, profileId));

      console.log('promises', promises)
      Promise.allSettled(promises)
        .then((results: any[]) => {
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              const res = result.value;
            } else {
              const err = result.reason;
            }
          });
        })
        .catch(error => {
          // Handle any errors that occurred during Promise.allSettled()
        });
    }
  };

  const handleSubmitProxyChanges = async (updatedData: ProxyDataTypes) => {
    await updateProfileProxy(updatedData);
  };

  const handleSubmitProfileChanges = async (
    updatedProfile: BrowserProfileDataTypes
  ) => {
    await handleSubmit(updatedProfile);
  };

  const handlePageChange = async (page: number) => {
    return getBrowserProfiles(`?page=${page}&perPage=${itemCount}`);
  };

  const handleChangePerPage = async (evt: SelectChangeEvent<number>) => {
    return getBrowserProfiles(`?page=1&perPage=${evt.target.value}`);
  };

  const deleteOneProfile = (selectedProfile: BrowserProfileDataTypes) => {
    setSelectedProfile(selectedProfile);
    setShowDeleteConfirmation(true);
  };

  const confirmProfileDelete = async () => {
    if (!selectedProfile) {
      return
    }

    await handleDeleteBrowserProfile([selectedProfile.id]);
  };

  const handleBulkDelete = (selectedRowIds: string[]) => {
    const selectedProxies = browserProfiles.filter(item => selectedRowIds.includes(item.id));
    setSelectedItems(selectedProxies);
    setShowBulkDeleteConfirmation(true);
  };

  const confirmProfileBulkDelete = async () => {
    const selectedRowIds = selectedItems.map(item => item.id);
    await handleDeleteBrowserProfile(selectedRowIds);
  };

  const handleSubmit = async (profile: BrowserProfileDataTypes) => {
    const updatedProfile = {
      ...profile,
      cookies: typeof profile.cookies === 'string' ? profile.cookies : JSON.stringify(profile.cookies),
    };

    if (updatedProfile.proxy && updatedProfile.proxy.id) {
      updatedProfile.proxyId = updatedProfile.proxy.id
    }

    if (updatedProfile.status) {
      updatedProfile.statusId = updatedProfile.status.id
    } else {
      delete updatedProfile.statusId;
    }

    if (updatedProfile.mainWebsite && updatedProfile.mainWebsite.id) {
      updatedProfile.mainWebsiteId = updatedProfile.mainWebsite.id
    }

    await updateBrowserProfile(updatedProfile);
  };

  const onColumnResize = () => {
    const savedColumns = localStorage.getItem(`browser-profile-title-columns`);

    if (savedColumns) {
      const updatedCols = JSON.parse(savedColumns).map((column: Column) => {
        return getUpdatedColumn(column, profileColumns);
      }).filter(Boolean);

      setProfileColumns(updatedCols);
    }
  };

  const handleColumnResize = () => {
    onColumnResize();
  };

  const handleAddBrowserProfile = () => {
    navigate(`/browser-profiles/create`);
  };

  const handelFolderChange = async ( folder?: BrovisorFolderTypes | null, ) => {
    if ( folder && folder.id ) {
      dispatch( setSelectedFolder(folder) );
      setSelectedFolderIds( [ folder.id ] );
    } else {
      setSelectedFolderIds( [] );
      dispatch( setSelectedFolder({id: '', name: '', emoji: ''}) );
    }
  };

  return (
    <Grid
      className={ styles.pageWrapper }
      maxWidth={ `calc(100vw - 56px)` }
    >
      <Stack>
        <BrovisorPageHeader
          componentTitle="browser-profile-title"
          addButtonTitle="browser-profile-add-button"
          count={browserProfilesCount}
          handleAdd={handleAddBrowserProfile}
          handleSearch={handleSearchProfiles}
          loading={filterLoading}
          globalFilterPlaceholder={"global-filter-placeholder"}
          disabled={!!idsOfSelectedRows.size}
        />
      </Stack>
      <Stack className={styles.foldersContainer}>
        <BrovisorFolder
          handelFolderChange={handelFolderChange}
        />
      </Stack>
      <Grid className={styles.tableContainer}>
        <BrovisorTable
          maxHeight={160}
          componentTitle="browser-profile-title"
          columns={profileColumns}
          data={browserProfiles}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          handlePageChange={handlePageChange}
          handleChangePerPage={handleChangePerPage}
          onColumnResize={handleColumnResize}
          bulkOperationsSettings={bulkOperationsSettings}
          hasCheckbox={true}
          brovisorEmptyScreenImage={searchValue ? searchIcon : browserProfilesIcon}
          emptyScreenCreateText={searchValue ?
            <FormattedMessage id="empty-screen-profiles-not-found"/> : folderIds.length ?
              <FormattedMessage id="empty-screen-create-profile-in-folder"/> :
              <FormattedMessage id="empty-screen-create-profile"/> }
          brovisorCreatedNothingText={ searchValue ?
            <FormattedMessage id="try-changing-your-search-term"/> : folderIds.length ?
              <FormattedMessage id="have-not-added-any-profile-to-the-folder"/> :
              <FormattedMessage id="have-not-created-any-profile-yet"/> }
          addButtonTitle={ <FormattedMessage id="browser-profile-add-button"/> }
          handleCreate={ handleAddBrowserProfile }
        />
      </Grid>
      {
        showDeleteConfirmation && (
          <DeleteAlertDialog
            name={selectedProfile.name}
            titleId={'browser-profile-delete-confirmation-title'}
            handleSubmit={confirmProfileDelete}
            handleClose={() => setShowDeleteConfirmation(false)}
          />
        )
      }
      {
        showBulkDeleteConfirmation && (
          <AlertDialog
            titleId={'browser-profile-bulk-delete-confirmation-title'}
            items={selectedItems}
            handleSubmit={confirmProfileBulkDelete}
            handleClose={() => setShowBulkDeleteConfirmation(false)}
          />
        )
      }
      {
        openBulkProxyModal && (
          <BulkProxyModal
            bulkProxyRef = {bulkProxyRef}
            handleCloseBulkProxyModal={() => setOpenBulkProxyModal(false)}
            handleSaveChanges={(proxy: ProxyDataTypes | null) => handleSaveBulkProxyChanges(proxy)}
          />
        )
      }
    </Grid>
  );
}

export default memo(BrowserProfiles);

