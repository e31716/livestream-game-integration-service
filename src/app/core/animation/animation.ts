import { trigger, style, transition, animate, animation, state, sequence } from '@angular/animations';

export const inOutAnimation = trigger('inOutAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.5s ease-out',
            style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s ease-in',
            style({ opacity: 0 }))
    ])
]
);

export const slideEnterAnimation = trigger('slideEnterAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('1s ease-out',
            style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
]
);


export const horizontalSlide = trigger('horizontalSlide', [
    state('left', style({ transform: 'translateX(0)' })),
    state('right', style({ transform: 'translateX(-100%)' })),
    transition('* => *', animate('.4s ease-in-out'))
]);

export const springInOutAnimation = trigger('springInOutAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        sequence([
            animate('.2s ease-out',
                style({ transform: 'translateX(5%)' })),
            animate('.3s ease-in-out',
                style({ transform: 'translateX(0)' }))
        ]),

    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        sequence([
            animate('.2s ease-in',
                style({ transform: 'translateX(5%)' })),
            animate('.3s ease-in',
                style({ transform: 'translateX(-100%)', opacity: 0 }))
        ])

    ])

]);

export const verticalInOutAnimation = trigger('verticalInOutAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('.3s ease-out',
            style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('.3s ease-in',
            style({ transform: 'translateY(100%)', opacity: 0 }))
    ])
]);

export const smallGiftInOutAnimation = trigger('smallGiftInOutAnimation', [
    transition(':enter', [
        style({ transform: 'scale(0.7)' }),
        sequence([
            animate('.2s ease-out',
                style({ transform: 'scale(1.3)' })),
            animate('.3s ease-in-out',
                style({ transform: 'scale(1)' }))
        ]),
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s ease-in',
            style({ opacity: 0 }))
    ])
]);
/** splash-page轉場動畫 */
export const fadeInOut = trigger('fadeInOut', [
    transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
    ]),
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
    ]),
]);
/** 隱藏,顯示主播的轉場動畫 for mobile */
export const fadeIn = trigger('fadeIn', [
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s ease-in',
            style({ opacity: 0 }))
    ])
]);

/** 戳戳樂專用側滑動畫 */
export const pokePanelAnimation = trigger('pokePanelAnimation', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        sequence([
            animate('.5s ease-out',
                style({ transform: 'translateX(5%)', opacity: 1 })),
            animate('.3s ease-in-out',
                style({ transform: 'translateX(0)' }))
        ]),

    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        sequence([
            animate('.2s ease-in',
                style({ transform: 'translateX(5%)' })),
            animate('.5s ease-in',
                style({ transform: 'translateX(-100%)', opacity: 0 }))
        ])

    ])

]);

