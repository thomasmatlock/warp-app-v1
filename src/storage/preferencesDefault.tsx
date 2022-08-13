const prefs = {
  audio: {
    dropdowns: [
      {
        title: 'Audio Quality',
        selectID: 'audioQuality',
        options: [
          {
            visible: true,
            enabled: true,
            id: 'audioQuality_best',
            value: 'audioQuality_best',
            label: 'Best Available',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_high',
            value: 'audioQuality_high',
            label: 'High quality (320kbps)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_medium',
            value: 'audioQuality_medium',
            label: 'Medium quality (256kbps)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_low',
            value: 'audioQuality_low',
            label: 'Low quality (128kbps)',
          },
        ],
      },

      {
        title: 'Audio Format',
        selectID: 'audioFormat',
        options: [
          {
            visible: true,
            enabled: true,
            id: 'audioFormat_MP3',
            value: 'audioFormat_MP3',
            label: 'MP3 (default)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_M4A',
            value: 'audioFormat_M4A',
            label: 'M4A',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_WAV',
            value: 'audioFormat_WAV',
            label: 'WAV',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_OGG',
            value: 'audioFormat_OGG',
            label: 'OGG',
          },
        ],
      },
    ],
  },
  video: {
    dropdowns: [
      {
        title: 'Video Quality',
        selectID: 'videoQuality',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'videoQuality_best',
            value: 'videoQuality_best',
            label: 'Best Available',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_8k_60fps',
            value: 'videoQuality_8k_60fps',
            label: '8k 60fps',
          },

          {
            enabled: false,
            visible: true,
            id: 'videoQuality_8k',
            value: 'videoQuality_8k',
            label: '8k',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_4k_60fps',
            value: 'videoQuality_4k_60fps',
            label: '4k 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_4k',
            value: 'videoQuality_4k',
            label: '4k',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_1080p_60fps',
            value: 'videoQuality_1080p_60fps',
            label: '1080p 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_1080p',
            value: 'videoQuality_1080p',
            label: '1080p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_720p_60fps',
            value: 'videoQuality_720p_60fps',
            label: '720p 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_720p',
            value: 'videoQuality_720p',
            label: '720p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_480p',
            value: 'videoQuality_480p',
            label: '480p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_360p',
            value: 'videoQuality_360p',
            label: '360p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_240p',
            value: 'videoQuality_240p',
            label: '240p',
          },
        ],
      },
      {
        title: 'Video Format',
        selectID: 'videoFormat',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'videoFormat_MP4',
            value: 'videoFormat_MP4',
            label: 'MP4 (default)',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoFormat_MKV',
            value: 'videoFormat_MKV',
            label: 'MKV',
          },

          {
            enabled: false,
            visible: true,
            id: 'videoFormat_MOV',
            value: 'videoFormat_MOV',
            label: 'MOV',
          },
        ],
      },
    ],
  },
  warpstagram: {
    dropdowns: [
      {
        title: 'Auto update',
        selectID: 'warpstagram_updateSelected',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Post sorting',
        selectID: 'warpstagram_postSorting',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_postSorting_default',
            value: 'warpstagram_postSorting_default',
            label: 'Default',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_new_to_old',
            value: 'warpstagram_postSorting_new_to_old',
            label: 'Newest to oldest',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_old_to_new',
            value: 'warpstagram_postSorting_old_to_new',
            label: 'Oldest to newest',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_AZ',
            value: 'warpstagram_postSorting_AZ',
            label: 'A to Z',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_ZA',
            value: 'warpstagram_postSorting_ZA',
            label: 'Z to A',
          },
        ],
      },
      {
        title: 'Auto update frequency',
        selectID: 'warpstagram_autoUpdateFrequency',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_24',
            value: 'warpstagram_autoUpdateFrequency_24',
            label: 'Daily',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_12',
            value: 'warpstagram_autoUpdateFrequency_12',
            label: '12 hours',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_6',
            value: 'warpstagram_autoUpdateFrequency_6',
            label: '6 hours',
          },
        ],
      },
    ],
  },
  general: {
    checkboxes: [{ autostartWarp: false }, { minimizeToTrayOnClose: false }],
    dropdowns: [
      {
        title: 'Theme',
        selectID: 'general_theme',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'general_theme_dark',
            value: 'general_theme_dark',
            label: 'Dark theme (default theme of Warp)',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_theme_light',
            value: 'general_theme_light',
            label: 'Light theme',
          },
        ],
      },
      {
        title: 'Startup mode on launch',
        selectID: 'general_startupTab',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'general_startupTab_audio',
            value: 'general_startupTab_audio',
            label: 'Audio (default startup mode)',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_video',
            value: 'general_startupTab_video',
            label: 'Video',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_warpstagram',
            value: 'general_startupTab_warpstagram',
            label: 'Warpstagram',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_recent',
            value: 'general_startupTab_recent',
            label: 'Most recently used mode',
          },
        ],
      },
    ],
  },
};
export default prefs;
