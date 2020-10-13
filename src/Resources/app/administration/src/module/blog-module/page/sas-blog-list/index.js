import { Component } from 'src/core/shopware';
import template from './sas-blog-list.twig';
import Criteria from 'src/core/data-new/criteria.data';

import './sas-blog-list.scss';

Component.register('sas-blog-list', {
    template,

    inject: ['repositoryFactory'],

    data() {
        return {
            blogEntries: null,
            total: 0,
            isLoading: true
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    created() {
        this.getList();
    },

    computed: {
        blogEntriesRepository() {
            return this.repositoryFactory.create('sas_blog_entries');
        },

        columns() {
            return [
                {
                    property: 'title',
                    dataIndex: 'title',
                    label: this.$tc('sas-blog.list.table.title'),
                    routerLink: 'blog.module.detail',
                    primary: true
                },
                {
                    property: 'active',
                    label: this.$tc('sas-blog.list.table.active')
                }
            ];
        }
    },

    methods: {
        changeLanguage() {
            this.getList();
        },

        getList() {
            this.isLoading = true;

            return this.blogEntriesRepository.search(new Criteria(), Shopware.Context.api).then((result) => {
                this.total = result.total;
                this.blogEntries = result;
                this.isLoading = false;
            })
        }
    }
});
