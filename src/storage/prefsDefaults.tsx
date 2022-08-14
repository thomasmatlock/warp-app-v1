const prefs = {
  audio: {
    dropdowns: [
      {
        title: 'Audio Quality',
        id: 'modal_dropdown_audio_quality',
        defaultValue: {
          id: 'modal_dropdown_audio_quality_high',
          value: 'modal_dropdown_audio_quality_high',
          label: 'High quality (320kbps)',
        },
        options: [
          {
            id: 'modal_dropdown_audio_quality_best',
            value: 'modal_dropdown_audio_quality_best',
            label: 'Best Available (default)',
          },
          {
            id: 'modal_dropdown_audio_quality_high',
            value: 'modal_dropdown_audio_quality_high',
            label: 'High quality (320kbps)',
          },
          {
            id: 'modal_dropdown_audio_quality_medium',
            value: 'modal_dropdown_audio_quality_medium',
            label: 'Medium quality (256kbps)',
          },
          {
            id: 'modal_dropdown_audio_quality_low',
            value: 'modal_dropdown_audio_quality_low',
            label: 'Low quality (128kbps)',
          },
        ],
      },
      {
        title: 'Audio Format',
        id: 'modal_dropdown_audio_format',
        defaultValue: {
          id: 'modal_dropdown_audio_format_M4A',
          value: 'modal_dropdown_audio_format_M4A',
          label: 'M4A',
        },
        options: [
          {
            id: 'modal_dropdown_audio_format_MP3',
            value: 'modal_dropdown_audio_format_MP3',
            label: 'MP3 (default)',
          },
          {
            id: 'modal_dropdown_audio_format_M4A',
            value: 'modal_dropdown_audio_format_M4A',
            label: 'M4A',
          },
          {
            id: 'modal_dropdown_audio_format_WAV',
            value: 'modal_dropdown_audio_format_WAV',
            label: 'WAV',
          },
          {
            id: 'modal_dropdown_audio_format_OGG',
            value: 'modal_dropdown_audio_format_OGG',
            label: 'OGG',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Audio Downloads Folder',
        id: 'modal_prefs_audio_outputFolder',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Audio',
      },
    ],
  },
  video: {
    dropdowns: [
      {
        title: 'Video Quality',
        id: 'modal_dropdown_video_quality',
        defaultValue: {
          id: 'modal_dropdown_video_quality_best',
          value: 'video_quality_best',
          label: 'Best Available (default)',
        },
        options: [
          {
            id: 'modal_dropdown_video_quality_best',
            value: 'video_quality_best',
            label: 'Best Available (default)',
          },
          {
            id: 'modal_dropdown_video_quality_8k_60fps',
            value: 'video_quality_8k_60fps',
            label: '8k 60fps',
          },

          {
            id: 'modal_dropdown_video_quality_8k',
            value: 'video_quality_8k',
            label: '8k',
          },
          {
            id: 'modal_dropdown_video_quality_4k_60fps',
            value: 'video_quality_4k_60fps',
            label: '4k 60fps',
          },
          {
            id: 'modal_dropdown_video_quality_4k',
            value: 'video_quality_4k',
            label: '4k',
          },
          {
            id: 'modal_dropdown_video_quality_1080p_60fps',
            value: 'video_quality_1080p_60fps',
            label: '1080p 60fps',
          },
          {
            id: 'modal_dropdown_video_quality_1080p',
            value: 'video_quality_1080p',
            label: '1080p',
          },
          {
            id: 'modal_dropdown_video_quality_720p_60fps',
            value: 'video_quality_720p_60fps',
            label: '720p 60fps',
          },
          {
            id: 'modal_dropdown_video_quality_720p',
            value: 'video_quality_720p',
            label: '720p',
          },
          {
            id: 'modal_dropdown_video_quality_480p',
            value: 'video_quality_480p',
            label: '480p',
          },
          {
            id: 'modal_dropdown_video_quality_360p',
            value: 'video_quality_360p',
            label: '360p',
          },
          {
            id: 'modal_dropdown_video_quality_240p',
            value: 'video_quality_240p',
            label: '240p',
          },
        ],
      },
      {
        title: 'Video Format',
        id: 'modal_dropdown_video_format',
        defaultValue: {
          id: 'modal_dropdown_video_format_MP4',
          value: 'video_format_MP4',
          label: 'MP4 (default)',
        },
        options: [
          {
            id: 'modal_dropdown_video_format_MP4',
            value: 'video_format_MP4',
            label: 'MP4 (default)',
          },
          {
            id: 'modal_dropdown_video_format_MKV',
            value: 'video_format_MKV',
            label: 'MKV',
          },

          {
            id: 'modal_dropdown_video_format_MOV',
            value: 'video_format_MOV',
            label: 'MOV',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Video Downloads Folder',
        id: 'modal_prefs_video_outputFolder',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Video',
      },
    ],
  },
  warpstagram: {
    dropdowns: [
      {
        title: 'Auto update',
        id: 'modal_dropdown_warpstagram_update',
        defaultValue: {
          id: 'modal_dropdown_warpstagram_update_all',
          value: 'warpstagram_update_all',
          label: 'Update All (default)',
        },
        options: [
          {
            id: 'modal_dropdown_warpstagram_update_all',
            value: 'warpstagram_update_all',
            label: 'Update All (default)',
          },
          {
            id: 'modal_dropdown_warpstagram_update_pinned',
            value: 'warpstagram_update_pinned',
            label: 'Update Pinned',
          },
          {
            id: 'modal_dropdown_warpstagram_update_disabled',
            value: 'warpstagram_update_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Post sorting',
        id: 'modal_dropdown_warpstagram_postSorting',
        defaultValue: {
          id: 'modal_dropdown_warpstagram_postSorting_new_to_old',
          value: 'warpstagram_postSorting_new_to_old',
          label: 'Newest to oldest (default)',
        },
        options: [
          {
            id: 'modal_dropdown_warpstagram_postSorting_new_to_old',
            value: 'warpstagram_postSorting_new_to_old',
            label: 'Newest to oldest (default)',
          },
          {
            id: 'modal_dropdown_warpstagram_postSorting_old_to_new',
            value: 'warpstagram_postSorting_old_to_new',
            label: 'Oldest to newest',
          },
          {
            id: 'modal_dropdown_warpstagram_postSorting_AZ',
            value: 'warpstagram_postSorting_AZ',
            label: 'A to Z',
          },
          {
            id: 'modal_dropdown_warpstagram_postSorting_ZA',
            value: 'warpstagram_postSorting_ZA',
            label: 'Z to A',
          },
        ],
      },
      {
        title: 'Auto update frequency',
        id: 'modal_dropdown_warpstagram_autoUpdateFrequency',
        defaultValue: {
          id: 'modal_dropdown_warpstagram_autoUpdateFrequency_24',
          value: 'warpstagram_autoUpdateFrequency_24',
          label: 'Daily (default)',
        },
        options: [
          {
            id: 'modal_dropdown_warpstagram_autoUpdateFrequency_24',
            value: 'warpstagram_autoUpdateFrequency_24',
            label: 'Daily (default)',
          },
          {
            id: 'modal_dropdown_warpstagram_autoUpdateFrequency_12',
            value: 'warpstagram_autoUpdateFrequency_12',
            label: '12 hours',
          },
          {
            id: 'modal_dropdown_warpstagram_autoUpdateFrequency_6',
            value: 'warpstagram_autoUpdateFrequency_6',
            label: '6 hours',
          },
        ],
      },
    ],
    folders: [
      {
        title: 'Warpstagram Downloads Folder',
        id: 'modal_prefs_warpstagram_outputFolder',
        placeholder: 'C:/Users/Tommy/Documents/Warp Downloader/Warpstagram',
      },
    ],
  },
  general: {
    checkboxes: [
      {
        title: 'Automatically start Warp on system start',
        id: 'checkbox_autostartWarpOnSystemStart',
        checked: false,
      },
      {
        title: 'Warp will minimize to your system tray when you close it',
        id: 'checkbox_minimizeToTrayOnClose',
        checked: true,
      },
    ],
    dropdowns: [
      {
        title: 'Startup mode on launch',
        id: 'modal_dropdown_general_startupMode',
        defaultValue: {
          id: 'modal_dropdown_general_startupMode_recent',
          value: 'general_startupMode_recent',
          label: 'Most recently used (default)',
        },
        options: [
          {
            id: 'modal_dropdown_general_startupMode_recent',
            value: 'general_startupMode_recent',
            label: 'Most recently used (default)',
          },
          {
            id: 'modal_dropdown_general_startupMode_audio',
            value: 'general_startupMode_audio',
            label: 'Audio',
          },
          {
            id: 'modal_dropdown_general_startupMode_video',
            value: 'general_startupMode_video',
            label: 'Video',
          },
          {
            id: 'modal_dropdown_general_startupMode_warpstagram',
            value: 'general_startupMode_warpstagram',
            label: 'Warpstagram',
          },
        ],
      },
      {
        title: 'Browser source on startup',
        id: 'modal_dropdown_general_startupSource',
        defaultValue: {
          id: 'modal_dropdown_general_startupSource_recent',
          value: 'general_startupSource_recent',
          label: 'Most recently used source (default)',
        },
        options: [
          {
            id: 'modal_dropdown_general_startupSource_recent',
            value: 'general_startupSource_recent',
            label: 'Most recently used source (default)',
          },
          {
            id: 'modal_dropdown_general_startupSource_facebook',
            value: 'general_startupSource_facebook',
            label: 'Facebook',
          },
          {
            id: 'modal_dropdown_general_startupSource_instagram',
            value: 'general_startupSource_instagram',
            label: 'Instagram',
          },
          {
            id: 'modal_dropdown_general_startupSource_pinterest',
            value: 'general_startupSource_pinterest',
            label: 'Pinterest',
          },
          {
            id: 'modal_dropdown_general_startupSource_snapchat',
            value: 'general_startupSource_snapchat',
            label: 'Snapchat',
          },
          {
            id: 'modal_dropdown_general_startupSource_soundcloud',
            value: 'general_startupSource_soundcloud',
            label: 'Soundcloud',
          },
          {
            id: 'modal_dropdown_general_startupSource_tiktok',
            value: 'general_startupSource_tiktok',
            label: 'Tiktok',
          },
          {
            id: 'modal_dropdown_general_startupSource_twitch',
            value: 'general_startupSource_twitch',
            label: 'Twitch',
          },
          {
            id: 'modal_dropdown_general_startupSource_twitter',
            value: 'general_startupSource_twitter',
            label: 'Twitter',
          },
          {
            id: 'modal_dropdown_general_startupSource_vimeo',
            value: 'general_startupSource_vimeo',
            label: 'Vimeo',
          },
          {
            id: 'modal_dropdown_general_startupSource_youtube',
            value: 'general_startupSource_youtube',
            label: 'Youtube',
          },
        ],
      },
    ],
  },
};
export default prefs;
